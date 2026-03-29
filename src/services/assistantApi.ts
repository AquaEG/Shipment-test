import { EnvConfigurationError, getN8nWebhookUrl } from '../config/env';
import type { AssistantRequestPayload, AssistantServiceResponse } from '../types';

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_RETRIES = 1;
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

type RequestOptions = {
  timeoutMs?: number;
  retries?: number;
  authToken?: string;
  headers?: Record<string, string>;
};

export class AssistantApiError extends Error {
  readonly status?: number;
  readonly retryable: boolean;

  constructor(message: string, options?: { status?: number; retryable?: boolean }) {
    super(message);
    this.name = 'AssistantApiError';
    this.status = options?.status;
    this.retryable = options?.retryable ?? false;
  }
}

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const createTimeoutSignal = (timeoutMs: number) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    cleanup: () => window.clearTimeout(timeoutId),
  };
};

const buildHeaders = (options?: RequestOptions) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  if (options?.authToken) {
    headers.Authorization = `Bearer ${options.authToken}`;
  }

  return headers;
};

const takeText = (value: unknown, depth = 0): string[] => {
  if (depth > 4 || value == null) {
    return [];
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => takeText(entry, depth + 1));
  }

  if (!isRecord(value)) {
    return [];
  }

  const directTextKeys = [
    'reply',
    'response',
    'message',
    'output',
    'text',
    'content',
    'answer',
    'assistantReply',
    'summary',
  ];

  const directHits = directTextKeys.flatMap((key) => takeText(value[key], depth + 1));
  if (directHits.length) {
    return directHits;
  }

  const nestedKeys = ['data', 'result', 'body', 'payload', 'messages', 'responses', 'items'];
  return nestedKeys.flatMap((key) => takeText(value[key], depth + 1));
};

const takeHighlights = (value: unknown): string[] => {
  if (!isRecord(value)) {
    return [];
  }

  const keys = ['highlights', 'actions', 'nextSteps', 'tasks'];

  for (const key of keys) {
    const candidate = value[key];
    if (!candidate) continue;

    if (Array.isArray(candidate)) {
      return candidate
        .flatMap((item) => takeText(item))
        .filter(Boolean)
        .slice(0, 4);
    }

    const single = takeText(candidate).slice(0, 4);
    if (single.length) {
      return single;
    }
  }

  return [];
};

const parseAssistantResponse = (payload: unknown): AssistantServiceResponse => {
  const textParts = takeText(payload);
  const text = textParts.join('\n\n').trim();

  if (!text) {
    throw new AssistantApiError(
      'The webhook completed, but no assistant reply was found in the response body.',
      { retryable: false },
    );
  }

  const highlights = takeHighlights(payload);

  return {
    text,
    summary: textParts[0],
    highlights,
    raw: payload,
  };
};

const postWebhook = async (
  payload: AssistantRequestPayload,
  options?: RequestOptions,
): Promise<AssistantServiceResponse> => {
  const webhookUrl = getN8nWebhookUrl();
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const { signal, cleanup } = createTimeoutSignal(timeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: buildHeaders(options),
      body: JSON.stringify(payload),
      signal,
    });

    const rawText = await response.text();
    const parsed = rawText ? safeJsonParse(rawText) : null;

    if (!response.ok) {
      throw new AssistantApiError(
        parsed && typeof parsed === 'object' && 'message' in parsed && typeof parsed.message === 'string'
          ? parsed.message
          : 'The assistant workflow could not be reached right now.',
        {
          status: response.status,
          retryable: RETRYABLE_STATUS_CODES.has(response.status),
        },
      );
    }

    return parseAssistantResponse(parsed ?? rawText);
  } catch (error) {
    if (error instanceof EnvConfigurationError) {
      throw error;
    }

    if (error instanceof AssistantApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AssistantApiError('The request timed out while waiting for the workflow response.', {
        retryable: true,
      });
    }

    throw new AssistantApiError('The assistant workflow request failed. Check the webhook and try again.', {
      retryable: true,
    });
  } finally {
    cleanup();
  }
};

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
};

export const buildAssistantRequestPayload = (message: string, currentPage = 'assistant'): AssistantRequestPayload => ({
  message,
  conversationId: 'agent-ops-demo',
  channel: 'assistant-dashboard',
  context: {
    integrations: ['email', 'calendar', 'sheets'],
    currentPage,
    workspace: 'executive-ops',
  },
  metadata: {
    sentAt: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: navigator.language,
  },
});

export const sendAssistantMessage = async (
  payload: AssistantRequestPayload,
  options?: RequestOptions,
): Promise<AssistantServiceResponse> => {
  const retries = options?.retries ?? DEFAULT_RETRIES;
  let attempt = 0;

  while (true) {
    try {
      return await postWebhook(payload, options);
    } catch (error) {
      const shouldRetry =
        attempt < retries &&
        error instanceof AssistantApiError &&
        error.retryable;

      if (!shouldRetry) {
        throw error;
      }

      attempt += 1;
      await delay(500 * attempt);
    }
  }
};

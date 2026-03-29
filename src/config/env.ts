export class EnvConfigurationError extends Error {
  readonly code = 'WEBHOOK_NOT_CONFIGURED';

  constructor(message: string) {
    super(message);
    this.name = 'EnvConfigurationError';
  }
}

const rawWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL?.trim() ?? '';

export const env = {
  n8nWebhookUrl: rawWebhookUrl,
};

export const getN8nWebhookUrl = () => {
  if (!env.n8nWebhookUrl) {
    throw new EnvConfigurationError('Webhook endpoint is not configured');
  }

  return env.n8nWebhookUrl;
};

export const getWebhookConfigState = () => ({
  envKey: 'VITE_N8N_WEBHOOK_URL',
  isConfigured: Boolean(env.n8nWebhookUrl),
  value: env.n8nWebhookUrl,
});

export const maskUrl = (value?: string) => {
  if (!value) return 'Not configured';

  try {
    const parsed = new URL(value);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return value;
  }
};

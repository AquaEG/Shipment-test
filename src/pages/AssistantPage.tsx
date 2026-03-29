import { useMemo, useState } from 'react';
import { ChatComposer } from '../components/assistant/ChatComposer';
import { MessageBubble } from '../components/assistant/MessageBubble';
import { GlassPanel } from '../components/ui/GlassPanel';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EnvConfigurationError, getWebhookConfigState } from '../config/env';
import { assistantIntroMessages, assistantSuggestions, integrationCards } from '../mock/data';
import { buildAssistantRequestPayload, sendAssistantMessage } from '../services/assistantApi';
import type { AssistantMessage } from '../types';

const formatTime = () =>
  new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

export const AssistantPage = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>(assistantIntroMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedInput, setLastFailedInput] = useState<string | null>(null);

  const webhookState = getWebhookConfigState();

  const canSend = webhookState.isConfigured && !isLoading;
  const messageCount = messages.filter((message) => message.role !== 'system').length;

  const assistantStatus = useMemo(
    () => (webhookState.isConfigured ? 'Live webhook path ready' : 'Webhook endpoint is not configured'),
    [webhookState.isConfigured],
  );

  const submitMessage = async (input: string, retrying = false) => {
    if (!retrying) {
      setMessages((current) => [
        ...current,
        {
          id: `user-${Date.now()}`,
          role: 'user',
          content: input,
          timestamp: formatTime(),
          status: 'complete',
        },
      ]);
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = buildAssistantRequestPayload(input, 'assistant');
      const response = await sendAssistantMessage(payload, { retries: 1, timeoutMs: 15000 });

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.text,
          timestamp: formatTime(),
          status: 'complete',
          meta: response.highlights.length ? response.highlights : ['Webhook response parsed'],
        },
      ]);
      setLastFailedInput(null);
    } catch (requestError) {
      const friendlyMessage =
        requestError instanceof EnvConfigurationError
          ? requestError.message
          : requestError instanceof Error
            ? requestError.message
            : 'The assistant request could not be completed.';

      setError(friendlyMessage);
      setLastFailedInput(input);
      setMessages((current) => [
        ...current,
        {
          id: `system-${Date.now()}`,
          role: 'system',
          content: friendlyMessage,
          timestamp: formatTime(),
          status: 'error',
          meta: ['Retry supported'],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="AI Assistant"
        title="Chat-first control for multi-tool agent work"
        description="The assistant page is webhook-ready by design. User prompts flow through a centralized typed service, which reads the n8n endpoint from the environment helper, applies timeout and retry behavior, and normalizes different response shapes before rendering them."
        actions={
          <>
            <StatusBadge label={assistantStatus} tone={webhookState.isConfigured ? 'success' : 'warning'} />
            <StatusBadge label={`${messageCount} chat items`} tone="neutral" />
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <GlassPanel className="min-h-[720px]">
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="surface-label">Conversation</p>
                <h3 className="mt-3 text-2xl font-semibold">Assistant orchestration stream</h3>
              </div>
              <StatusBadge label={isLoading ? 'Waiting on workflow' : 'Ready'} tone={isLoading ? 'info' : 'success'} />
            </div>

            {!webhookState.isConfigured ? (
              <div className="mt-6 rounded-[24px] border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
                Webhook endpoint is not configured. Add <span className="font-mono">VITE_N8N_WEBHOOK_URL</span> to your environment to enable live assistant requests.
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-[24px] border border-rose-400/20 bg-rose-400/10 p-4 text-sm leading-7 text-rose-100">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-slate-300">
                    Agent is coordinating email, calendar, and sheets...
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <ChatComposer
                onSubmit={(value) => void submitMessage(value)}
                onRetry={lastFailedInput ? () => void submitMessage(lastFailedInput, true) : undefined}
                hasRetry={Boolean(lastFailedInput)}
                disabled={!canSend}
                loading={isLoading}
              />
            </div>
          </div>
        </GlassPanel>

        <div className="space-y-4">
          <GlassPanel>
            <p className="surface-label">Suggested prompts</p>
            <h3 className="mt-3 text-2xl font-semibold">Webhook-ready scenarios</h3>

            <div className="mt-6 space-y-3">
              {assistantSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => void submitMessage(suggestion.prompt)}
                  disabled={!canSend}
                  className="w-full rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-brand-400/30 hover:bg-brand-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <p className="text-sm font-semibold text-white">{suggestion.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{suggestion.prompt}</p>
                </button>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="surface-label">Connected surfaces</p>
            <h3 className="mt-3 text-2xl font-semibold">Integration context included in each request</h3>

            <div className="mt-6 space-y-3">
              {integrationCards.slice(0, 3).map((integration) => (
                <div key={integration.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-white">{integration.name}</p>
                    <StatusBadge label={integration.status} tone="info" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{integration.detail}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="surface-label">Request contract</p>
            <h3 className="mt-3 text-2xl font-semibold">What the service sends</h3>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/60 p-4 font-mono text-xs leading-6 text-slate-300">
              {`POST ${webhookState.isConfigured ? 'configured-webhook' : 'missing-webhook'}\n{\n  "message": "...",\n  "conversationId": "agent-ops-demo",\n  "channel": "assistant-dashboard",\n  "context": { "integrations": ["email", "calendar", "sheets"] },\n  "metadata": { "sentAt": "ISO-8601", "timezone": "local", "locale": "browser" }\n}`}
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
};

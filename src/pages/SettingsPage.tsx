import { GlassPanel } from '../components/ui/GlassPanel';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { getWebhookConfigState, maskUrl } from '../config/env';
import { integrationCards } from '../mock/data';

export const SettingsPage = () => {
  const webhookState = getWebhookConfigState();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Settings"
        title="Integration health, webhook setup, and future auth readiness"
        description="This page makes environment state explicit. The n8n webhook is read from the env helper only, never hardcoded, and the UI clearly shows whether the assistant can send live requests."
      />

      <section className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
        <GlassPanel>
          <p className="surface-label">Webhook Configuration</p>
          <h3 className="mt-3 text-2xl font-semibold">n8n endpoint</h3>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-white">Environment variable</p>
              <StatusBadge label={webhookState.isConfigured ? 'Configured' : 'Missing'} tone={webhookState.isConfigured ? 'success' : 'warning'} />
            </div>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <div>
                <p className="text-slate-400">Key</p>
                <p className="mt-1 font-mono text-sm text-slate-100">{webhookState.envKey}</p>
              </div>
              <div>
                <p className="text-slate-400">Resolved value</p>
                <p className="mt-1 break-all font-mono text-sm text-slate-100">{maskUrl(webhookState.value)}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
                {webhookState.isConfigured
                  ? 'The AI Assistant page can send POST requests through the typed service layer.'
                  : 'Webhook endpoint is not configured. Add VITE_N8N_WEBHOOK_URL to .env to enable live requests.'}
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="surface-label">Integrations</p>
          <h3 className="mt-3 text-2xl font-semibold">Current and planned connections</h3>

          <div className="mt-6 space-y-3">
            {integrationCards.map((integration) => (
              <div key={integration.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{integration.name}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{integration.description}</p>
                    <p className="mt-2 text-sm text-slate-400">{integration.detail}</p>
                  </div>
                  <StatusBadge
                    label={integration.status}
                    tone={
                      integration.status === 'Connected'
                        ? 'success'
                        : integration.status === 'Needs Config'
                          ? 'warning'
                          : 'info'
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>
    </div>
  );
};

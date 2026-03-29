import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { getPageMeta, navigationItems } from '../../config/navigation';
import { getWebhookConfigState } from '../../config/env';
import { cn } from '../../lib/utils';
import { StatusBadge } from '../ui/StatusBadge';

export const AppShell = () => {
  const location = useLocation();
  const pageMeta = getPageMeta(location.pathname);
  const webhookState = getWebhookConfigState();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-cyanGlow/20 blur-3xl" />
        <div className="absolute right-[-10%] top-20 h-80 w-80 rounded-full bg-violetGlow/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-grid bg-[size:32px_32px] opacity-[0.08]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="glass-panel panel-hairline flex flex-col gap-6 p-4 sm:p-5">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-4">
                <div className="glow-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-cyanGlow to-violetGlow font-display text-base font-semibold text-white">
                  AI
                </div>
                <div>
                  <p className="surface-label">Control Surface</p>
                  <p className="mt-1 text-lg font-semibold text-white">Agent Ops</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                One assistant, one webhook pathway, and a workspace built to orchestrate email, calendar, and sheets.
              </p>
            </div>

            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 transition-all',
                      isActive
                        ? 'border-brand-400/30 bg-brand-500/12 text-white shadow-glow'
                        : 'bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.shortLabel}</p>
                      </div>
                      <span
                        className={cn(
                          'h-2.5 w-2.5 rounded-full transition-colors',
                          isActive ? 'bg-cyanGlow' : 'bg-slate-600 group-hover:bg-slate-400',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Webhook state</p>
                <StatusBadge
                  label={webhookState.isConfigured ? 'Configured' : 'Missing'}
                  tone={webhookState.isConfigured ? 'success' : 'warning'}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {webhookState.isConfigured
                  ? 'Assistant requests will POST through the centralized service layer.'
                  : 'Set VITE_N8N_WEBHOOK_URL to activate live workflow calls.'}
              </p>
            </div>
          </aside>

          <div className="flex min-h-0 flex-col gap-4">
            <header className="glass-panel panel-hairline p-5 sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="surface-label">{pageMeta.label}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{pageMeta.description}</h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Environment</p>
                    <p className="mt-1 font-mono text-sm text-slate-200">{webhookState.envKey}</p>
                  </div>
                  <StatusBadge
                    label={webhookState.isConfigured ? 'Webhook ready' : 'Needs setup'}
                    tone={webhookState.isConfigured ? 'info' : 'warning'}
                  />
                </div>
              </div>
            </header>

            <main className="min-h-0 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

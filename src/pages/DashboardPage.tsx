import { PageHeader } from '../components/ui/PageHeader';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { activityEntries, dashboardStats, focusItems, sheetSyncs } from '../mock/data';

const toneClasses = {
  cyan: 'from-cyanGlow/20 to-transparent',
  violet: 'from-violetGlow/20 to-transparent',
  blue: 'from-brand-500/20 to-transparent',
};

export const DashboardPage = () => {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Mission Control"
        title="Operational visibility across every assistant-managed surface"
        description="A premium command center for the AI agent: monitor what it is handling, what needs review, and how email, calendar, and sheets stay in sync through one orchestration path."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <GlassPanel>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="surface-label">Active Focus Queue</p>
              <h3 className="mt-3 text-2xl font-semibold">Today’s highest-leverage automations</h3>
            </div>
            <StatusBadge label="3 live lanes" tone="info" />
          </div>

          <div className="mt-6 space-y-4">
            {focusItems.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className={`absolute inset-y-0 left-0 w-full bg-gradient-to-r ${toneClasses[item.tone]} opacity-70`} />
                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">{item.detail}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
                    <p>{item.owner}</p>
                    <p className="mt-1 text-slate-400">ETA {item.eta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="surface-label">Live Activity</p>
          <h3 className="mt-3 text-2xl font-semibold">Recent workflow outcomes</h3>

          <div className="mt-6 space-y-4">
            {activityEntries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{entry.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{entry.detail}</p>
                  </div>
                  <StatusBadge
                    label={entry.status}
                    tone={entry.status === 'Completed' ? 'success' : entry.status === 'Failed' ? 'error' : 'info'}
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                  {entry.source} • {entry.time}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassPanel>
          <p className="surface-label">Sheet Sync Health</p>
          <h3 className="mt-3 text-2xl font-semibold">Structured data writes</h3>

          <div className="mt-6 space-y-4">
            {sheetSyncs.map((sync) => (
              <div key={sync.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{sync.name}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {sync.tab} • {sync.rows}
                    </p>
                  </div>
                  <StatusBadge
                    label={sync.state}
                    tone={sync.state === 'Healthy' ? 'success' : sync.state === 'Warning' ? 'warning' : 'info'}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-300">Last synced {sync.syncedAt}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-brand-500/20 via-cyanGlow/10 to-violetGlow/20 blur-2xl" />
          <div className="relative">
            <p className="surface-label">Control Philosophy</p>
            <h3 className="mt-3 max-w-xl text-2xl font-semibold">
              The interface stays calm while the agent handles noisy coordination behind the scenes.
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                'Centralized webhook client with timeout, retries, and parsing guards.',
                'Reusable UI primitives and page modules prepared for real backend integration.',
                'Settings surface that makes missing environment setup visible instead of silent.',
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-sm leading-7 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>
    </div>
  );
};

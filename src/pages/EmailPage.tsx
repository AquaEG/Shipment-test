import { GlassPanel } from '../components/ui/GlassPanel';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { inboxThreads } from '../mock/data';

export const EmailPage = () => {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Email Surface"
        title="Inbox triage with draft generation and escalation awareness"
        description="A realistic inbox workspace for the agent to summarize threads, suggest replies, and push actions into the wider orchestration flow."
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassPanel>
          <p className="surface-label">Priority threads</p>
          <h3 className="mt-3 text-2xl font-semibold">Assistant-curated inbox queue</h3>

          <div className="mt-6 space-y-3">
            {inboxThreads.map((thread) => (
              <div key={thread.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{thread.sender}</p>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-300">
                        {thread.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-white">{thread.subject}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{thread.preview}</p>
                  </div>

                  <div className="flex min-w-[170px] flex-col items-start gap-3 rounded-[20px] border border-white/10 bg-slate-950/50 px-4 py-3">
                    <StatusBadge
                      label={thread.state}
                      tone={
                        thread.state === 'Draft Ready'
                          ? 'success'
                          : thread.state === 'Needs Reply'
                            ? 'warning'
                            : 'info'
                      }
                    />
                    <p className="text-sm text-slate-400">{thread.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-4">
          <GlassPanel>
            <p className="surface-label">Automation rules</p>
            <h3 className="mt-3 text-2xl font-semibold">Current behaviors</h3>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Escalate finance and vendor exceptions into the activity log.',
                'Draft replies for revenue threads with meeting or pricing context.',
                'Push structured notes into sheets after interviews or approvals complete.',
              ].map((rule) => (
                <div key={rule} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  {rule}
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="surface-label">Outcome summary</p>
            <h3 className="mt-3 text-2xl font-semibold">Morning shift performance</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['Drafts prepared', '12'],
                ['Auto-labeled', '38'],
                ['Needs review', '5'],
                ['Escalations', '2'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
};

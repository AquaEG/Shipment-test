import { GlassPanel } from '../components/ui/GlassPanel';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { activityEntries } from '../mock/data';

export const ActivityLogPage = () => {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Activity Log"
        title="Every automation event, retry, and escalation in one timeline"
        description="A reviewable trail of agent actions so operators can understand what happened, what retried, and what still needs intervention."
      />

      <GlassPanel>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="surface-label">Timeline</p>
            <h3 className="mt-3 text-2xl font-semibold">Recent workflow events</h3>
          </div>
          <StatusBadge label="Audit friendly" tone="info" />
        </div>

        <div className="mt-8 space-y-4">
          {activityEntries.map((entry) => (
            <div key={entry.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-lg font-semibold text-white">{entry.title}</p>
                    <StatusBadge
                      label={entry.status}
                      tone={
                        entry.status === 'Completed'
                          ? 'success'
                          : entry.status === 'Failed'
                            ? 'error'
                            : entry.status === 'Retried'
                              ? 'warning'
                              : 'info'
                      }
                    />
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{entry.detail}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                  <p>{entry.source}</p>
                  <p className="mt-1 text-slate-500">{entry.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};

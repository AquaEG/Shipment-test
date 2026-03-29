import { GlassPanel } from '../components/ui/GlassPanel';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { calendarEvents } from '../mock/data';

export const CalendarPage = () => {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Calendar Surface"
        title="Scheduling clarity, conflict resolution, and protected focus time"
        description="The calendar workspace shows how the assistant can coordinate holds, prep blocks, and meeting moves before those actions are sent through the live n8n workflow."
      />

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <GlassPanel>
          <p className="surface-label">Today’s schedule</p>
          <h3 className="mt-3 text-2xl font-semibold">Priority event stream</h3>

          <div className="mt-6 space-y-4">
            {calendarEvents.map((event) => (
              <div key={event.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{event.title}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {event.owner} • {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {event.start} - {event.end}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">{event.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-4">
          <GlassPanel>
            <p className="surface-label">Scheduling health</p>
            <h3 className="mt-3 text-2xl font-semibold">Risk indicators</h3>
            <div className="mt-6 space-y-3">
              {[
                ['Conflicts resolved', '7', 'success'],
                ['Pending approvals', '2', 'warning'],
                ['Focus blocks protected', '4', 'info'],
              ].map(([label, value, tone]) => (
                <div key={label} className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="mt-1 text-sm text-slate-400">Since the first calendar sync today</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <StatusBadge label={tone} tone={tone as 'success' | 'warning' | 'info'} />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="surface-label">Assistant playbook</p>
            <h3 className="mt-3 text-2xl font-semibold">How the agent behaves</h3>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Keep executive focus blocks intact unless a meeting is marked critical.',
                'When a new meeting is inserted, look for the lowest-cost move rather than widening the day.',
                'Surface any calendar action that changes customer-facing commitments before writing it back.',
              ].map((rule) => (
                <div key={rule} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  {rule}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
};

import type { ShipmentHistoryEvent } from '../types/shipment';
import { formatDateTime } from '../lib/utils';

type ShipmentTimelineProps = {
  events: ShipmentHistoryEvent[];
};

const TRACKING_STEPS = ['Shipment Created', 'Picked Up', 'In Transit', 'Out For Delivery', 'Delivered'];

const getStepIndex = (events: ShipmentHistoryEvent[]) => {
  const latestEvent = events[events.length - 1];
  const latest = latestEvent?.status.toLowerCase() ?? '';

  const index = TRACKING_STEPS.findIndex((step) => latest.includes(step.toLowerCase()));
  return index === -1 ? 2 : index;
};

export const ShipmentTimeline = ({ events }: ShipmentTimelineProps) => {
  const currentStepIndex = getStepIndex(events);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2">
          {TRACKING_STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex;

            return (
              <div key={step} className="flex min-w-[120px] flex-1 items-center gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      'flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-bold',
                      isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400',
                    ].join(' ')}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Step {index + 1}</p>
                    <p className="text-sm font-semibold text-slate-700">{step}</p>
                  </div>
                </div>
                {index < TRACKING_STEPS.length - 1 ? (
                  <div
                    className={[
                      'hidden h-[2px] flex-1 rounded-full lg:block',
                      index < currentStepIndex ? 'bg-brand-500' : 'bg-slate-200',
                    ].join(' ')}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Shipment history</h3>
          <p className="text-sm text-slate-500">{events.length} updates</p>
        </div>

        {events.length ? (
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={`${event.status}-${event.date ?? index}`}
                className="relative rounded-3xl border border-slate-200 bg-slate-50/80 p-5"
              >
                <div className="absolute left-6 top-6 h-full w-px bg-slate-200 last:hidden" />
                <div className="relative flex gap-4">
                  <div className="mt-1 h-3.5 w-3.5 rounded-full bg-brand-500 ring-4 ring-brand-100" />
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{event.status}</p>
                        <p className="mt-1 text-sm text-slate-600">{event.location || 'Location pending'}</p>
                      </div>
                      <p className="text-sm font-medium text-slate-500">{formatDateTime(event.date)}</p>
                    </div>
                    {event.description ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
            No shipment history was returned from the tracking service yet.
          </div>
        )}
      </div>
    </div>
  );
};

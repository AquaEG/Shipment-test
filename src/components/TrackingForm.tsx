import { FormEvent } from 'react';

type TrackingFormProps = {
  trackingNumber: string;
  onTrackingNumberChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  modeLabel: string;
};

export const TrackingForm = ({
  trackingNumber,
  onTrackingNumberChange,
  onSubmit,
  isLoading,
  modeLabel,
}: TrackingFormProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-white/15 bg-gradient-to-br from-white/12 via-white/8 to-teal-300/10 p-4 shadow-soft backdrop-blur-xl md:p-5"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-100/90">
            Command Center
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-white">Track a live shipment</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Enter a tracking number to query your Market Minds AI webhook flow and render the latest
            shipment intelligence.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Mode</p>
          <p className="mt-1 text-sm font-semibold text-white">{modeLabel}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <label className="flex-1">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/80">
            Tracking Number
          </span>
          <input
            value={trackingNumber}
            onChange={(event) => onTrackingNumberChange(event.target.value)}
            placeholder="Enter AWB, order, or shipment number"
            className="h-14 w-full rounded-2xl border border-white/15 bg-slate-950/50 px-4 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-4 focus:ring-teal-400/15"
          />
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-14 min-w-[180px] items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-brand-500 px-6 text-sm font-semibold text-white transition hover:from-teal-500 hover:to-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Tracking...' : 'Track Shipment'}
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
          Webhook-ready request body: <span className="font-mono text-sky-200">{"{ tracking_number }"}</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
          Built for carrier APIs, Google Sheets, or n8n automation chains.
        </div>
      </div>
    </form>
  );
};

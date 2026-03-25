import type { ShipmentRecord } from '../types/shipment';
import { formatDateTime, formatLabel, getInitials } from '../lib/utils';
import { ShipmentTimeline } from './ShipmentTimeline';
import { StatusBadge } from './StatusBadge';

type TrackingResultCardProps = {
  shipment: ShipmentRecord;
  onRefresh: () => void;
  onCopyTrackingNumber: () => void;
  isRefreshing: boolean;
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
    <p className="mt-3 text-sm font-semibold text-slate-900">{formatLabel(value)}</p>
  </div>
);

const getProgressValue = (status: string) => {
  const value = status.toLowerCase();

  if (value.includes('deliver')) return 100;
  if (value.includes('out for delivery')) return 85;
  if (value.includes('transit') || value.includes('route')) return 64;
  if (value.includes('picked')) return 40;
  if (value.includes('created')) return 18;

  return 52;
};

export const TrackingResultCard = ({
  shipment,
  onRefresh,
  onCopyTrackingNumber,
  isRefreshing,
}: TrackingResultCardProps) => {
  const progressValue = getProgressValue(shipment.shipmentStatus);

  return (
    <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-6 border-b border-slate-200 pb-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-brand-900 p-6 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-200">
                  Market Minds AI Live View
                </p>
                <StatusBadge status={shipment.shipmentStatus} />
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                Tracking #{shipment.trackingNumber}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Review the current checkpoint, delivery estimate, and operational movement returned from
                your webhook or automation backend.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                onClick={onCopyTrackingNumber}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Copy tracking number
              </button>
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-teal-500 hover:to-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh tracking'}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Operational Status</p>
              <p className="mt-3 text-lg font-semibold">{shipment.shipmentStatus}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current Location</p>
              <p className="mt-3 text-lg font-semibold">{formatLabel(shipment.currentLocation)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Expected Delivery</p>
              <p className="mt-3 text-lg font-semibold">{formatDateTime(shipment.estimatedDelivery)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Delivery Confidence</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{progressValue}%</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-brand-500 text-lg font-bold text-white">
                {getInitials(shipment.carrierName)}
              </div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-brand-500"
                style={{ width: `${progressValue}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Based on the latest shipment status returned by your webhook workflow.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Shipment Profile</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                  {getInitials(shipment.recipientName)}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Recipient</p>
                  <p className="text-base font-semibold text-slate-900">{formatLabel(shipment.recipientName)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-700">
                  {getInitials(shipment.carrierName)}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Carrier</p>
                  <p className="text-base font-semibold text-slate-900">{formatLabel(shipment.carrierName)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DetailItem label="Carrier Name" value={shipment.carrierName} />
        <DetailItem label="Recipient Name" value={shipment.recipientName} />
        <DetailItem label="Current Location" value={shipment.currentLocation} />
        <DetailItem label="Last Update" value={formatDateTime(shipment.lastUpdate)} />
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6">
        <ShipmentTimeline events={shipment.shipmentHistory} />
      </div>
    </section>
  );
};

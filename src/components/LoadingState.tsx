export const LoadingState = () => (
  <div className="rounded-[28px] border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur">
    <div className="flex items-center gap-4">
      <div className="h-11 w-11 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      <div>
        <p className="font-semibold text-slate-900">Fetching latest shipment updates</p>
        <p className="mt-1 text-sm text-slate-600">
          We&apos;re checking the carrier data and building your tracking timeline.
        </p>
      </div>
    </div>
  </div>
);

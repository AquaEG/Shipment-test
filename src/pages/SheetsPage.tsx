import { GlassPanel } from '../components/ui/GlassPanel';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { sheetSyncs } from '../mock/data';

export const SheetsPage = () => {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Sheets Surface"
        title="Structured updates, sync validation, and row-level confidence"
        description="A sheet operations surface for the assistant to merge notes, push CRM updates, and pause risky writes when required fields are missing."
      />

      <section className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <GlassPanel>
          <p className="surface-label">Connected sheets</p>
          <h3 className="mt-3 text-2xl font-semibold">Sync jobs and row volume</h3>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
            <div className="grid grid-cols-[1.25fr_0.75fr_0.75fr_0.6fr] gap-4 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.22em] text-slate-400">
              <span>Dataset</span>
              <span>Tab</span>
              <span>Last sync</span>
              <span>Status</span>
            </div>

            {sheetSyncs.map((sync) => (
              <div
                key={sync.id}
                className="grid grid-cols-[1.25fr_0.75fr_0.75fr_0.6fr] gap-4 border-b border-white/10 px-5 py-4 text-sm text-slate-200 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-white">{sync.name}</p>
                  <p className="mt-1 text-slate-400">{sync.rows}</p>
                </div>
                <span>{sync.tab}</span>
                <span className="text-slate-400">{sync.syncedAt}</span>
                <StatusBadge
                  label={sync.state}
                  tone={sync.state === 'Healthy' ? 'success' : sync.state === 'Warning' ? 'warning' : 'info'}
                />
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-4">
          <GlassPanel>
            <p className="surface-label">Validation layer</p>
            <h3 className="mt-3 text-2xl font-semibold">Guardrails before writing</h3>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {[
                'Missing owners trigger a review task instead of a blind write.',
                'Row updates stay modular so extra workbook metadata can be added later.',
                'Retry support is reserved for transient webhook or transport failures, not validation errors.',
              ].map((rule) => (
                <div key={rule} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  {rule}
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="surface-label">Snapshot</p>
            <h3 className="mt-3 text-2xl font-semibold">Write pressure</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['Queued writes', '14'],
                ['Paused rows', '2'],
                ['Healthy feeds', '9'],
                ['Manual reviews', '1'],
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

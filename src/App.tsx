import { useState } from 'react';
import { EmptyState } from './components/EmptyState';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingState } from './components/LoadingState';
import { TrackingForm } from './components/TrackingForm';
import { TrackingResultCard } from './components/TrackingResultCard';
import { trackingConfig } from './config/tracking';
import { fetchShipment } from './services/trackingService';
import type { ShipmentRecord } from './types/shipment';

const HERO_METRICS = [
  { value: 'AI Ready', label: 'Built for automated logistics workflows' },
  { value: '<15s', label: 'Protected webhook request timeout' },
  { value: 'n8n Ready', label: 'Switch from mock to live in minutes' },
];

const PLATFORM_PILLARS = [
  'Branded customer-facing shipment portal',
  'Webhook-first architecture for automation',
  'Flexible provider and sheet-backed response mapping',
];

const NAV_ITEMS = ['Overview', 'Tracking Hub', 'Automation Ready', 'Carrier Insights'];
const OPS_METRICS = [
  { label: 'Active carriers', value: '12' },
  { label: 'Webhook schema modes', value: 'Flexible' },
  { label: 'Tracking SLA layer', value: 'Real-time' },
];

const APP_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
  noResults: 'no-results',
} as const;

type AppState = (typeof APP_STATES)[keyof typeof APP_STATES];

const App = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeTrackingNumber, setActiveTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<ShipmentRecord | null>(null);
  const [appState, setAppState] = useState<AppState>(APP_STATES.idle);
  const [error, setError] = useState('');

  const modeLabel = trackingConfig.mode === 'mock' ? 'Mock data for testing' : 'Live webhook mode';
  const webhookSummary = trackingConfig.webhookUrl
    ? trackingConfig.webhookUrl
    : 'Add VITE_TRACKING_WEBHOOK_URL in .env';

  const runTracking = async (input = trackingNumber) => {
    const normalizedInput = input.trim();

    if (!normalizedInput) {
      setError('Please enter a valid tracking number before submitting.');
      setAppState(APP_STATES.error);
      setShipment(null);
      return;
    }

    setError('');
    setAppState(APP_STATES.loading);
    setActiveTrackingNumber(normalizedInput);

    try {
      const result = await fetchShipment(normalizedInput);

      if (!result.shipmentHistory.length && !result.shipmentStatus) {
        setShipment(null);
        setAppState(APP_STATES.noResults);
        return;
      }

      setShipment(result);
      setAppState(APP_STATES.success);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'We could not load shipment details right now.';

      if (message.toLowerCase().includes('not found')) {
        setAppState(APP_STATES.noResults);
        setShipment(null);
        setError(message);
        return;
      }

      setError(message);
      setShipment(null);
      setAppState(APP_STATES.error);
    }
  };

  const handleCopyTrackingNumber = async () => {
    if (!shipment?.trackingNumber) return;

    try {
      await navigator.clipboard.writeText(shipment.trackingNumber);
    } catch {
      setError('Copy action is not available in this browser context.');
      setAppState(APP_STATES.error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[560px] bg-grid bg-[size:34px_34px] opacity-40" />
      <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl animate-float" />
      <div className="absolute right-[-80px] top-32 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl animate-float" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <header className="animate-rise rounded-[30px] border border-white/10 bg-white/5 px-5 py-4 shadow-soft backdrop-blur md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 via-teal-500 to-brand-600 text-lg font-extrabold text-white shadow-soft">
                MM
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-100">Market Minds AI</p>
                <p className="mt-1 text-lg font-bold tracking-tight text-white">Shipment Tracking System</p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-950/30 px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>
        </header>

        <section className="animate-rise mt-6 rounded-[36px] border border-white/10 bg-slate-950/70 px-6 py-8 shadow-soft backdrop-blur xl:px-10 xl:py-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex rounded-full border border-teal-300/20 bg-teal-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-teal-100">
                  Market Minds AI
                </p>
                <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                  Shipment Tracking System
                </p>
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl">
                Logistics visibility with a real product identity, not a generic tracking page.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Market Minds AI gives operations teams a branded shipment tracking experience powered by
                webhook automation, flexible carrier data, and a dashboard that feels production-ready from
                day one.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {PLATFORM_PILLARS.map((pillar) => (
                  <div
                    key={pillar}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
                  >
                    {pillar}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {HERO_METRICS.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <TrackingForm
              trackingNumber={trackingNumber}
              onTrackingNumberChange={setTrackingNumber}
              onSubmit={() => void runTracking()}
              isLoading={appState === APP_STATES.loading}
              modeLabel={modeLabel}
            />
          </div>
        </section>

        <section className="animate-rise mt-8 grid gap-8 lg:grid-cols-[1.6fr_0.7fr]">
          <div className="space-y-6">
            {appState === APP_STATES.loading ? <LoadingState /> : null}
            {appState === APP_STATES.error && error ? <ErrorMessage message={error} /> : null}

            {appState === APP_STATES.idle ? (
              <EmptyState
                title="Start by entering a tracking number"
                description="The app is ready to send a POST request with the tracking number to your webhook and render the response in a structured dashboard."
              />
            ) : null}

            {appState === APP_STATES.noResults ? (
              <EmptyState
                title="No shipment details found"
                description={error || 'The tracking service did not return any shipment history for this number.'}
              />
            ) : null}

            {shipment && appState !== APP_STATES.idle && appState !== APP_STATES.noResults ? (
              <TrackingResultCard
                shipment={shipment}
                onRefresh={() => void runTracking(activeTrackingNumber || shipment.trackingNumber)}
                onCopyTrackingNumber={() => void handleCopyTrackingNumber()}
                isRefreshing={appState === APP_STATES.loading}
              />
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white/90 to-teal-50 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Operations Snapshot</p>
              <div className="mt-4 grid gap-3">
                {OPS_METRICS.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-teal-100 bg-white/80 p-4">
                    <p className="text-sm text-slate-500">{metric.label}</p>
                    <p className="mt-2 text-xl font-bold tracking-tight text-slate-950">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Brand Control</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                Market Minds AI deployment panel
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  The webhook is controlled through <span className="font-mono text-slate-900">.env</span>,
                  not inside component code. Set <span className="font-mono text-slate-900">VITE_TRACKING_WEBHOOK_URL</span> and switch mock mode off when your backend is ready.
                </p>
                <p>
                  The frontend sends a simple JSON payload with the tracking number and safely normalizes
                  flexible response shapes before rendering the dashboard.
                </p>
                <p>
                  This structure is ready for n8n, provider APIs, or Google Sheets-backed automation flows
                  without rewriting the interface.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Platform Snapshot</p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Brand</p>
                  <p className="mt-1 text-sm text-slate-600">Market Minds AI logistics experience</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Runtime Mode</p>
                  <p className="mt-1 text-sm text-slate-600">{modeLabel}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Response Layer</p>
                  <p className="mt-1 text-sm text-slate-600">Safe normalization for varying webhook schemas</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Webhook Endpoint</p>
              <div className="mt-4 rounded-3xl bg-slate-950 p-4 text-sm text-emerald-100">
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">Environment Variable</p>
                <p className="mt-2 break-all font-mono text-sm text-white">{webhookSummary}</p>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Request Body</p>
              <pre className="mt-4 overflow-x-auto rounded-3xl bg-slate-950 p-4 text-sm text-sky-100">
{`{
  "tracking_number": "${activeTrackingNumber || 'TRK123456789'}"
}`}
              </pre>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default App;

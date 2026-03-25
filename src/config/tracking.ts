import type { TrackingMode } from '../types/shipment';

const env = import.meta.env;

// Integration values are driven from .env so the webhook never needs to live in UI components.
export const trackingConfig = {
  mode: (env.VITE_TRACKING_USE_MOCK === 'false' ? 'live' : 'mock') as TrackingMode,
  webhookUrl: env.VITE_TRACKING_WEBHOOK_URL?.trim() ?? '',
  requestTimeoutMs: 15000,
};

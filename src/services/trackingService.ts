import { trackingConfig } from '../config/tracking';
import { buildMockShipment } from '../lib/mockShipment';
import { normalizeShipmentResponse } from '../lib/normalizeShipment';
import type { ShipmentRecord } from '../types/shipment';

const SIMULATED_LATENCY_MS = 900;

const createTimeoutSignal = (timeoutMs: number) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    clear: () => window.clearTimeout(timeoutId),
  };
};

const buildUserError = (message: string) => new Error(message);

export const fetchShipment = async (trackingNumber: string): Promise<ShipmentRecord> => {
  if (trackingConfig.mode === 'mock') {
    await new Promise((resolve) => window.setTimeout(resolve, SIMULATED_LATENCY_MS));
    return buildMockShipment(trackingNumber);
  }

  if (!trackingConfig.webhookUrl) {
    throw buildUserError('Webhook URL is missing. Add it in your environment settings first.');
  }

  const { signal, clear } = createTimeoutSignal(trackingConfig.requestTimeoutMs);

  try {
    const response = await fetch(trackingConfig.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracking_number: trackingNumber,
      }),
      signal,
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw buildUserError('The tracking service is currently unavailable. Please try again.');
    }

    const normalized = normalizeShipmentResponse(payload, trackingNumber);

    if (!normalized) {
      throw buildUserError('Shipment details were not found for this tracking number.');
    }

    if (normalized.success === false) {
      throw buildUserError('Shipment not found. Please check the tracking number and try again.');
    }

    return normalized;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw buildUserError('The request took too long. Please try again.');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw buildUserError('Something went wrong while retrieving shipment data.');
  } finally {
    clear();
  }
};

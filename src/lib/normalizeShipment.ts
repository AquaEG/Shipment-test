import type { ShipmentHistoryEvent, ShipmentRecord } from '../types/shipment';
import { capitalizeWords } from './utils';

type UnknownRecord = Record<string, unknown>;

const asRecord = (value: unknown): UnknownRecord | null =>
  typeof value === 'object' && value !== null ? (value as UnknownRecord) : null;

const getString = (source: UnknownRecord | null, keys: string[]) => {
  if (!source) return undefined;

  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
};

const getNestedObject = (source: UnknownRecord | null, keys: string[]) => {
  if (!source) return null;

  for (const key of keys) {
    const value = asRecord(source[key]);
    if (value) return value;
  }

  return null;
};

const getArray = (source: UnknownRecord | null, keys: string[]) => {
  if (!source) return [];

  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
};

const normalizeHistoryEvent = (event: unknown): ShipmentHistoryEvent | null => {
  const record = asRecord(event);
  if (!record) return null;

  const status =
    getString(record, ['status', 'title', 'label', 'event']) ||
    getString(getNestedObject(record, ['details']), ['status']) ||
    'Update available';

  const location = getString(record, ['location', 'current_location', 'city', 'hub']);
  const date = getString(record, ['date', 'datetime', 'timestamp', 'last_update']);
  const description = getString(record, ['description', 'details', 'note', 'message']);

  return { status: capitalizeWords(status), location, date, description };
};

export const normalizeShipmentResponse = (
  payload: unknown,
  fallbackTrackingNumber: string,
): ShipmentRecord | null => {
  const root = asRecord(payload);
  const nested = getNestedObject(root, ['data', 'result', 'shipment', 'tracking']);
  const source = nested ?? root;

  if (!source) return null;

  const history = getArray(source, ['shipment_history', 'history', 'timeline', 'events'])
    .map(normalizeHistoryEvent)
    .filter((event): event is ShipmentHistoryEvent => Boolean(event));
  const latestHistoryEvent = history[history.length - 1];

  const rawShipmentStatus =
    getString(source, ['shipment_status', 'status', 'current_status']) || latestHistoryEvent?.status;

  const currentLocation =
    getString(source, ['current_location', 'location', 'latest_location']) ||
    latestHistoryEvent?.location;

  const lastUpdate =
    getString(source, ['last_update', 'updated_at', 'latest_update']) || latestHistoryEvent?.date;

  const trackingNumber =
    getString(source, ['tracking_number', 'trackingNumber', 'awb', 'reference']) ||
    fallbackTrackingNumber;

  const estimatedDelivery = getString(source, [
    'estimated_delivery',
    'estimatedDelivery',
    'delivery_date',
    'eta',
  ]);

  const carrierName = getString(source, ['carrier_name', 'carrier', 'provider', 'courier']);
  const recipientName = getString(source, ['recipient_name', 'recipient', 'customer_name']);

  const hasUsefulData =
    Boolean(rawShipmentStatus) ||
    Boolean(currentLocation) ||
    Boolean(lastUpdate) ||
    Boolean(estimatedDelivery) ||
    Boolean(carrierName) ||
    Boolean(recipientName) ||
    Boolean(history.length);

  if (!hasUsefulData) return null;

  const record: ShipmentRecord = {
    trackingNumber,
    shipmentStatus: capitalizeWords(rawShipmentStatus || 'Status Pending'),
    currentLocation,
    lastUpdate,
    estimatedDelivery,
    carrierName,
    recipientName,
    shipmentHistory: history,
    success: typeof source.success === 'boolean' ? source.success : undefined,
    raw: payload,
  };

  return record;
};

export type ShipmentHistoryEvent = {
  status: string;
  location?: string;
  date?: string;
  description?: string;
};

export type ShipmentRecord = {
  trackingNumber: string;
  shipmentStatus: string;
  currentLocation?: string;
  lastUpdate?: string;
  estimatedDelivery?: string;
  carrierName?: string;
  recipientName?: string;
  shipmentHistory: ShipmentHistoryEvent[];
  success?: boolean;
  raw?: unknown;
};

export type TrackingMode = 'mock' | 'live';

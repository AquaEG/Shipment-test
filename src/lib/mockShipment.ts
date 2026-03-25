import type { ShipmentRecord } from '../types/shipment';

export const buildMockShipment = (trackingNumber: string): ShipmentRecord => ({
  trackingNumber,
  shipmentStatus: 'In Transit',
  currentLocation: 'Cairo Sorting Center',
  lastUpdate: '2026-03-25 14:30',
  estimatedDelivery: '2026-03-27',
  carrierName: 'Aramex',
  recipientName: 'Ahmed Waheed',
  shipmentHistory: [
    {
      status: 'Shipment Created',
      location: 'Alexandria',
      date: '2026-03-23 09:00',
      description: 'Label generated and shipment registered.',
    },
    {
      status: 'Picked Up',
      location: 'Alexandria Hub',
      date: '2026-03-23 13:15',
      description: 'Package collected from sender.',
    },
    {
      status: 'In Transit',
      location: 'Cairo Sorting Center',
      date: '2026-03-25 14:30',
      description: 'Shipment is moving through the regional sorting network.',
    },
  ],
  success: true,
});

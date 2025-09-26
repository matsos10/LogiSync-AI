import type { InventoryItem, Shipment } from './types';
function generateSKU() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';
  for (let i = 0; i < 8; i++) {
    sku += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sku;
}
export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: crypto.randomUUID(),
    name: 'Industrial Grade Widgets',
    sku: generateSKU(),
    quantity: 150,
    status: 'In Stock',
    lastUpdated: Date.now() - 86400000 * 2, // 2 days ago
  },
  {
    id: crypto.randomUUID(),
    name: 'Heavy-Duty Sprockets',
    sku: generateSKU(),
    quantity: 25,
    status: 'Low Stock',
    lastUpdated: Date.now() - 86400000 * 1, // 1 day ago
  },
  {
    id: crypto.randomUUID(),
    name: 'Precision Bearings',
    sku: generateSKU(),
    quantity: 0,
    status: 'Out of Stock',
    lastUpdated: Date.now() - 86400000 * 5, // 5 days ago
  },
  {
    id: crypto.randomUUID(),
    name: 'Reinforced Flanges',
    sku: generateSKU(),
    quantity: 500,
    status: 'In Stock',
    lastUpdated: Date.now() - 3600000 * 3, // 3 hours ago
  },
  {
    id: crypto.randomUUID(),
    name: 'Carbon Fiber Rods',
    sku: generateSKU(),
    quantity: 75,
    status: 'In Stock',
    lastUpdated: Date.now() - 86400000 * 3, // 3 days ago
  },
];
export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: crypto.randomUUID(),
    trackingNumber: `1Z${generateSKU()}`,
    status: 'In Transit',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    estimatedDelivery: Date.now() + 86400000 * 2, // 2 days from now
  },
  {
    id: crypto.randomUUID(),
    trackingNumber: `1Z${generateSKU()}`,
    status: 'Delivered',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    estimatedDelivery: Date.now() - 86400000 * 1, // delivered yesterday
  },
  {
    id: crypto.randomUUID(),
    trackingNumber: `1Z${generateSKU()}`,
    status: 'Pending',
    origin: 'Miami, FL',
    destination: 'Seattle, WA',
    estimatedDelivery: Date.now() + 86400000 * 5, // 5 days from now
  },
];
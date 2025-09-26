export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: number; // timestamp
};
export type Shipment = {
  id: string;
  trackingNumber: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Delayed';
  origin: string;
  destination: string;
  estimatedDelivery: number; // timestamp
};
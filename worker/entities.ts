import { IndexedEntity } from "./core-utils";
import type { InventoryItem, Shipment } from "@shared/types";
import { MOCK_INVENTORY_ITEMS, MOCK_SHIPMENTS } from "@shared/mock-data";
// INVENTORY ENTITY: one DO instance per inventory item
export class InventoryEntity extends IndexedEntity<InventoryItem> {
  static readonly entityName = "inventory";
  static readonly indexName = "inventory_items";
  static readonly initialState: InventoryItem = { 
    id: "", 
    name: "", 
    sku: "", 
    quantity: 0, 
    status: 'Out of Stock', 
    lastUpdated: 0 
  };
  static seedData = MOCK_INVENTORY_ITEMS;
}
// SHIPMENT ENTITY: one DO instance per shipment
export class ShipmentEntity extends IndexedEntity<Shipment> {
  static readonly entityName = "shipment";
  static readonly indexName = "shipments";
  static readonly initialState: Shipment = {
    id: "",
    trackingNumber: "",
    status: 'Pending',
    origin: "",
    destination: "",
    estimatedDelivery: 0,
  };
  static seedData = MOCK_SHIPMENTS;
}
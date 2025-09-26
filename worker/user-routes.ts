import { Hono } from "hono";
import type { Env } from './core-utils';
import { InventoryEntity, ShipmentEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { InventoryItem, Shipment } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure seed data is present on first load
  app.use('/api/*', async (c, next) => {
    await Promise.all([
      InventoryEntity.ensureSeed(c.env),
      ShipmentEntity.ensureSeed(c.env)
    ]);
    await next();
  });
  // INVENTORY ROUTES
  app.get('/api/inventory', async (c) => {
    const page = await InventoryEntity.list(c.env);
    return ok(c, page);
  });
  app.post('/api/inventory', async (c) => {
    const { name, sku, quantity } = await c.req.json<Partial<InventoryItem>>();
    if (!isStr(name) || !isStr(sku) || typeof quantity !== 'number' || quantity < 0) {
      return bad(c, 'name, sku, and a valid quantity are required');
    }
    const status = quantity === 0 ? 'Out of Stock' : quantity < 50 ? 'Low Stock' : 'In Stock';
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      name,
      sku,
      quantity,
      status,
      lastUpdated: Date.now(),
    };
    const created = await InventoryEntity.create(c.env, newItem);
    return ok(c, created);
  });
  app.put('/api/inventory/:id', async (c) => {
    const id = c.req.param('id');
    const { name, sku, quantity } = await c.req.json<Partial<InventoryItem>>();
    if (!isStr(name) || !isStr(sku) || typeof quantity !== 'number' || quantity < 0) {
      return bad(c, 'name, sku, and a valid quantity are required');
    }
    const itemEntity = new InventoryEntity(c.env, id);
    if (!await itemEntity.exists()) {
      return notFound(c, 'Inventory item not found');
    }
    const status = quantity === 0 ? 'Out of Stock' : quantity < 50 ? 'Low Stock' : 'In Stock';
    await itemEntity.patch({
      name,
      sku,
      quantity,
      status,
      lastUpdated: Date.now(),
    });
    return ok(c, await itemEntity.getState());
  });
  app.delete('/api/inventory/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await InventoryEntity.delete(c.env, id);
    if (!deleted) {
      return notFound(c, 'Inventory item not found');
    }
    return ok(c, { id, deleted: true });
  });
  // SHIPMENT ROUTES
  app.get('/api/shipments', async (c) => {
    const page = await ShipmentEntity.list(c.env);
    return ok(c, page);
  });
  app.post('/api/shipments', async (c) => {
    const body = await c.req.json<Partial<Shipment>>();
    if (!isStr(body.trackingNumber) || !isStr(body.origin) || !isStr(body.destination)) {
      return bad(c, 'trackingNumber, origin, and destination are required');
    }
    const newShipment: Shipment = {
      id: crypto.randomUUID(),
      trackingNumber: body.trackingNumber,
      origin: body.origin,
      destination: body.destination,
      status: body.status || 'Pending',
      estimatedDelivery: body.estimatedDelivery || Date.now() + 86400000 * 5, // Default 5 days
    };
    const created = await ShipmentEntity.create(c.env, newShipment);
    return ok(c, created);
  });
  app.put('/api/shipments/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json<Partial<Shipment>>();
    const shipmentEntity = new ShipmentEntity(c.env, id);
    if (!await shipmentEntity.exists()) {
      return notFound(c, 'Shipment not found');
    }
    await shipmentEntity.patch(body);
    return ok(c, await shipmentEntity.getState());
  });
  app.delete('/api/shipments/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await ShipmentEntity.delete(c.env, id);
    if (!deleted) {
      return notFound(c, 'Shipment not found');
    }
    return ok(c, { id, deleted: true });
  });
}
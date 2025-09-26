import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DeliveriesDataTable } from '@/components/deliveries/DeliveriesDataTable';
import { AddEditShipmentDialog } from '@/components/deliveries/AddEditShipmentDialog';
import { api } from '@/lib/api-client';
import type { Shipment } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
export function DeliveriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const queryClient = useQueryClient();
  const { data: shipmentsData, isLoading, error } = useQuery<{ items: Shipment[] }>({
    queryKey: ['shipments'],
    queryFn: () => api('/api/shipments'),
  });
  const handleAddShipment = () => {
    setSelectedShipment(null);
    setIsDialogOpen(true);
  };
  const handleEditShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsDialogOpen(true);
  };
  const handleDeleteShipment = async (shipmentId: string) => {
    try {
      await api(`/api/shipments/${shipmentId}`, { method: 'DELETE' });
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    } catch (err) {
      console.error('Failed to delete shipment:', err);
    }
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedShipment(null);
  };
  const handleDialogSave = () => {
    queryClient.invalidateQueries({ queryKey: ['shipments'] });
    handleDialogClose();
  };
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Delivery Management</h1>
          <p className="text-muted-foreground">
            Track and manage all your shipments.
          </p>
        </div>
        <Button onClick={handleAddShipment}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Shipment
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            Failed to load shipment data.
          </div>
        ) : (
          <DeliveriesDataTable
            data={shipmentsData?.items || []}
            onEdit={handleEditShipment}
            onDelete={handleDeleteShipment}
          />
        )}
      </div>
      <AddEditShipmentDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        shipment={selectedShipment}
      />
    </DashboardLayout>
  );
}
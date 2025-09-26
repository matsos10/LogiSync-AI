import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { InventoryDataTable } from '@/components/inventory/InventoryDataTable';
import { AddEditInventoryDialog } from '@/components/inventory/AddEditInventoryDialog';
import { api } from '@/lib/api-client';
import type { InventoryItem } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
export function InventoryPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const queryClient = useQueryClient();
  const { data: inventoryData, isLoading, error } = useQuery<{ items: InventoryItem[] }>({
    queryKey: ['inventory'],
    queryFn: () => api('/api/inventory'),
  });
  const handleAddItem = () => {
    setSelectedItem(null);
    setIsDialogOpen(true);
  };
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };
  const handleDeleteItem = async (itemId: string) => {
    try {
      await api(`/api/inventory/${itemId}`, { method: 'DELETE' });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };
  const handleDialogSave = () => {
    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    handleDialogClose();
  };
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage your product stock.
          </p>
        </div>
        <Button onClick={handleAddItem}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
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
            Failed to load inventory data.
          </div>
        ) : (
          <InventoryDataTable
            data={inventoryData?.items || []}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
      <AddEditInventoryDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        item={selectedItem}
      />
    </DashboardLayout>
  );
}
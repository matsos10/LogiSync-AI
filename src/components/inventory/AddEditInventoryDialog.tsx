import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api-client';
import type { InventoryItem } from '@shared/types';
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  sku: z.string().min(2, { message: 'SKU must be at least 2 characters.' }),
  quantity: z.coerce.number().min(0, { message: 'Quantity must be a positive number.' }),
});
type InventoryFormValues = z.infer<typeof formSchema>;
interface AddEditInventoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  item: InventoryItem | null;
}
export function AddEditInventoryDialog({ isOpen, onClose, onSave, item }: AddEditInventoryDialogProps) {
  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sku: '',
      quantity: 0,
    },
  });
  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({ name: '', sku: '', quantity: 0 });
    }
  }, [item, form, isOpen]);
  const onSubmit = async (values: InventoryFormValues) => {
    try {
      if (item) {
        // Edit existing item
        await api(`/api/inventory/${item.id}`, {
          method: 'PUT',
          body: JSON.stringify(values),
        });
      } else {
        // Create new item
        await api('/api/inventory', {
          method: 'POST',
          body: JSON.stringify(values),
        });
      }
      onSave();
    } catch (error) {
      console.error('Failed to save inventory item:', error);
      // Here you might want to show a toast notification to the user
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          <DialogDescription>
            {item ? 'Update the details of your inventory item.' : 'Fill in the details for the new inventory item.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Industrial Widgets" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., WID-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
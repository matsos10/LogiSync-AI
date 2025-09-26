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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api-client';
import type { Shipment } from '@shared/types';
const formSchema = z.object({
  trackingNumber: z.string().min(5, { message: 'Tracking number is required.' }),
  origin: z.string().min(2, { message: 'Origin is required.' }),
  destination: z.string().min(2, { message: 'Destination is required.' }),
  status: z.enum(['Pending', 'In Transit', 'Delivered', 'Delayed']),
});
type ShipmentFormValues = z.infer<typeof formSchema>;
interface AddEditShipmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  shipment: Shipment | null;
}
export function AddEditShipmentDialog({ isOpen, onClose, onSave, shipment }: AddEditShipmentDialogProps) {
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: '',
      origin: '',
      destination: '',
      status: 'Pending',
    },
  });
  useEffect(() => {
    if (shipment) {
      form.reset(shipment);
    } else {
      form.reset({
        trackingNumber: '',
        origin: '',
        destination: '',
        status: 'Pending',
      });
    }
  }, [shipment, form, isOpen]);
  const onSubmit = async (values: ShipmentFormValues) => {
    try {
      if (shipment) {
        await api(`/api/shipments/${shipment.id}`, {
          method: 'PUT',
          body: JSON.stringify(values),
        });
      } else {
        await api('/api/shipments', {
          method: 'POST',
          body: JSON.stringify(values),
        });
      }
      onSave();
    } catch (error) {
      console.error('Failed to save shipment:', error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{shipment ? 'Edit Shipment' : 'Add New Shipment'}</DialogTitle>
          <DialogDescription>
            {shipment ? 'Update the details of the shipment.' : 'Fill in the details for the new shipment.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField control={form.control} name="trackingNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Number</FormLabel>
                <FormControl><Input placeholder="e.g., 1Z999AA10123456784" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="origin" render={({ field }) => (
              <FormItem>
                <FormLabel>Origin</FormLabel>
                <FormControl><Input placeholder="e.g., Los Angeles, CA" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="destination" render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl><Input placeholder="e.g., New York, NY" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
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
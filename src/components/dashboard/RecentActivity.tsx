import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Shipment } from "@shared/types";
import { Package, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
interface RecentActivityProps {
  shipments: Shipment[];
  isLoading: boolean;
}
export function RecentActivity({ shipments, isLoading }: RecentActivityProps) {
  const { t } = useTranslation();
  const recentShipments = shipments
    .sort((a, b) => b.estimatedDelivery - a.estimatedDelivery) // A simple sort, could be by a 'lastUpdated' field
    .slice(0, 5);
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (recentShipments.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-8">
        {t('dashboard.activity.noActivity')}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {recentShipments.map((shipment) => (
        <div key={shipment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-brand-accent text-white">
              {shipment.status === 'Pending' ? <Package className="h-4 w-4" /> : <Truck className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {t('dashboard.activity.shipmentUpdated')} "{shipment.status}"
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.trackingNumber}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
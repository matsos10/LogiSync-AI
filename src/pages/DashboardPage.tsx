import { Activity, DollarSign, Package, Truck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api-client";
import type { InventoryItem, Shipment } from "@shared/types";
import { DemandForecastChart } from "@/components/dashboard/DemandForecastChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
export function DashboardPage() {
  const { t } = useTranslation();
  const { data: inventoryData, isLoading: isLoadingInventory } = useQuery<{ items: InventoryItem[] }>({
    queryKey: ['inventory'],
    queryFn: () => api('/api/inventory'),
  });
  const { data: shipmentsData, isLoading: isLoadingShipments } = useQuery<{ items: Shipment[] }>({
    queryKey: ['shipments'],
    queryFn: () => api('/api/shipments'),
  });
  const totalStock = inventoryData?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const lowStockItems = inventoryData?.items.filter(item => item.status === 'Low Stock').length ?? 0;
  const inTransitShipments = shipmentsData?.items.filter(item => item.status === 'In Transit').length ?? 0;
  const isLoading = isLoadingInventory || isLoadingShipments;
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.cards.totalStock')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{totalStock.toLocaleString()}</div>}
            <p className="text-xs text-muted-foreground">{t('dashboard.cards.unitsInAllWarehouses')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.cards.lowStockItems')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{lowStockItems}</div>}
            <p className="text-xs text-muted-foreground">{t('dashboard.cards.requireReordering')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.cards.shipmentsInTransit')}</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{inTransitShipments}</div>}
            <p className="text-xs text-muted-foreground">{t('dashboard.cards.onTheWayToCustomers')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.cards.forecastedRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">$125,345</div>}
            <p className="text-xs text-muted-foreground">{t('dashboard.cards.next30Days')}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>{t('dashboard.forecast.title')}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DemandForecastChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.activity.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity shipments={shipmentsData?.items || []} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
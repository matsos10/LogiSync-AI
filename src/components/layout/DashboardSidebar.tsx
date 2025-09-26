import { Link, useLocation } from 'react-router-dom';
import { Truck, Home, Package, BarChart3, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
const navItems = [
  { href: '/dashboard', icon: Home, labelKey: 'overview' },
  { href: '/inventory', icon: Package, labelKey: 'inventory' },
  { href: '/deliveries', icon: BarChart3, labelKey: 'deliveries' },
  { href: '/settings', icon: Settings, labelKey: 'settings' },
];
export function DashboardSidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Truck className="h-6 w-6 text-brand-accent" />
            <span className="text-lg text-brand-primary">LogiSync AI</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.labelKey}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  location.pathname === item.href && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(`nav.${item.labelKey}`)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>{t('sidebar.upgradeTitle')}</CardTitle>
              <CardDescription>
                {t('sidebar.upgradeDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white">
                {t('sidebar.upgradeButton')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
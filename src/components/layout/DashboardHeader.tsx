import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  CircleUser,
  Menu,
  Search,
  Truck,
  Home,
  Package,
  BarChart3,
  Settings,
  Globe,
  LogOut,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
const navItems = [
  { href: '/dashboard', icon: Home, labelKey: 'overview' },
  { href: '/inventory', icon: Package, labelKey: 'inventory' },
  { href: '/deliveries', icon: BarChart3, labelKey: 'deliveries' },
  { href: '/settings', icon: Settings, labelKey: 'settings' },
];
export function DashboardHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate('/login');
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Truck className="h-6 w-6 text-brand-accent" />
              <span className="text-lg text-brand-primary">LogiSync AI</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.labelKey}
                to={item.href}
                className={cn(
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                  location.pathname === item.href && 'bg-muted text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {t(`nav.${item.labelKey}`)}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('header.searchPlaceholder')}
              className="w-full appearance-none bg-brand-neutral-bg pl-8 md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Change language">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('fr')}>Français</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('es')}>Español</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('pt')}>Português</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.name || t('header.myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link to="/settings">{t('header.settings')}</Link></DropdownMenuItem>
          <DropdownMenuItem>{t('header.support')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('header.logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
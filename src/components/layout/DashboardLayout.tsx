import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-brand-neutral-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
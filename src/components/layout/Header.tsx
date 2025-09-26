import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Truck, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b bg-background/80 backdrop-blur-sm shadow-sm' : 'border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={(e) => handleLinkClick(e, '#hero')}>
          <Truck className="h-8 w-8 text-brand-accent" />
          <span className="text-2xl font-bold text-brand-primary">LogiSync AI</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" aria-label="Change language">
            <Globe className="h-5 w-5" />
          </Button>
          <Button asChild className="bg-brand-primary text-primary-foreground hover:bg-brand-primary/90 transition-transform duration-200 hover:-translate-y-0.5">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold transition-transform duration-200 hover:-translate-y-0.5">
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex flex-col gap-6 p-6">
              <Link to="/" className="flex items-center gap-2 self-start" onClick={(e) => handleLinkClick(e, '#hero')}>
                <Truck className="h-7 w-7 text-brand-accent" />
                <span className="text-xl font-bold text-brand-primary">LogiSync AI</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold">
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
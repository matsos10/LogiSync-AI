import { Truck, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
];
const footerLinks = [
  { title: 'Product', links: ['Features', 'Pricing', 'Security', 'FAQ'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Contact'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
];
export function Footer() {
  return (
    <footer className="bg-brand-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-brand-accent" />
              <span className="text-2xl font-bold">LogiSync AI</span>
            </Link>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              AI-powered logistics and supply chain optimization.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className="text-muted-foreground hover:text-brand-accent transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold uppercase tracking-wider text-sm">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LogiSync AI. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}
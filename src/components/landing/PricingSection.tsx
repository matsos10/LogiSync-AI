import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
const tiers = [
  {
    name: 'Starter',
    price: '49',
    description: 'For small teams getting started with logistics optimization.',
    features: ['AI Demand Forecasting (Basic)', 'Inventory Tracking', 'Manual Route Planning', 'Basic Analytics'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '99',
    description: 'For growing businesses that need advanced automation and insights.',
    features: ['AI Demand Forecasting (Advanced)', 'Automated Inventory Reordering', 'AI Route Optimization', 'Advanced Analytics & Reporting', 'API Access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For large-scale operations with custom needs and dedicated support.',
    features: ['All Pro features', 'Custom AI Model Training', 'Dedicated Account Manager', 'Enterprise-grade Security & SSO', 'Custom Integrations'],
    popular: false,
  },
];
export function PricingSection() {
  return (
    <section id="pricing" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that's right for your business. All plans start with a 14-day free trial.
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={cn(
                "flex flex-col h-full",
                tier.popular ? "ring-2 ring-brand-accent shadow-2xl" : "ring-1 ring-border"
              )}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-brand-primary">{tier.name}</CardTitle>
                    {tier.popular && <div className="rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold text-white">POPULAR</div>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    {tier.price === 'Contact Us' ? (
                      <span className="text-4xl font-bold tracking-tight text-brand-primary">Contact Us</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold tracking-tight text-brand-primary">${tier.price}</span>
                        <span className="text-base font-medium text-muted-foreground">/month</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check className="h-6 w-5 flex-none text-brand-accent" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className={cn(
                    "w-full font-bold transition-transform duration-200 hover:-translate-y-1",
                    tier.popular ? "bg-brand-accent hover:bg-brand-accent/90 text-white" : "bg-brand-primary hover:bg-brand-primary/90 text-primary-foreground"
                  )}>
                    <Link to="/signup">
                      {tier.price === 'Contact Us' ? 'Get in Touch' : 'Start Free Trial'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
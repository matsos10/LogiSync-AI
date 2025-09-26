import { BrainCircuit, Boxes, Route, BarChart3 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
const features = [
  {
    name: 'AI Demand Forecasting',
    description: 'Accurately predict future demand with our machine learning models to prevent stockouts and overstocking.',
    icon: BrainCircuit,
  },
  {
    name: 'Automated Inventory',
    description: 'Optimize stock levels with automatic reordering, smart alerts, and real-time inventory tracking.',
    icon: Boxes,
  },
  {
    name: 'Intelligent Route Planning',
    description: 'Minimize delivery times and fuel costs with AI-powered route optimization for your entire fleet.',
    icon: Route,
  },
  {
    name: 'Cost & Performance Analytics',
    description: 'Gain deep insights into your logistics operations with comprehensive dashboards and reporting.',
    icon: BarChart3,
  },
];
const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.1,
    },
  }),
};
export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">Core Functionality</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
            Everything you need to optimize your logistics
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From predictive analytics to automated execution, our platform is designed to streamline every aspect of your supply chain.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="flex flex-col"
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-brand-primary">
                  <feature.icon className="h-8 w-8 flex-none text-brand-accent" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
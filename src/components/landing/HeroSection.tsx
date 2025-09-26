import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section id="hero" className="relative bg-brand-neutral-bg py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[50rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#00c49f] to-[#0a2540] opacity-20 blur-3xl" />
      </div>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-6xl lg:text-7xl">
            Revolutionize Your Supply Chain with <span className="text-brand-accent">AI</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            LogiSync AI provides intelligent demand forecasting, automated inventory optimization, and smart delivery planning to cut costs and boost efficiency.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
              <Link to="/signup">
                Start 14-Day Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flow-root sm:mt-24"
        >
          <div className="rounded-xl bg-background/5 p-2 ring-1 ring-inset ring-brand-primary/10 lg:rounded-2xl lg:p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1678252333019-a9860e259178?q=80&w=2070&auto=format&fit=crop"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
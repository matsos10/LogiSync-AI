import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
const testimonials = [
  {
    quote: "LogiSync AI has been a game-changer for our inventory management. We've reduced stockouts by 40% and our carrying costs are down 25%. The AI forecasting is incredibly accurate.",
    name: 'Sarah Johnson',
    title: 'Operations Manager, EcoGoods',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    fallback: 'SJ',
  },
  {
    quote: "The route optimization feature alone saves us hundreds of hours and thousands in fuel costs every month. Our delivery times have never been better. Highly recommended!",
    name: 'Michael Chen',
    title: 'Logistics Director, QuickShip',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    fallback: 'MC',
  },
  {
    quote: "As a small business, we don't have a dedicated logistics team. LogiSync AI is like having an expert on staff 24/7. It's intuitive, powerful, and has directly impacted our bottom line.",
    name: 'Jessica Rodriguez',
    title: 'Founder, The Artisan Box',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    fallback: 'JR',
  },
];
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-brand-neutral-bg py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
            Trusted by Growing Businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See how companies like yours are transforming their supply chain with LogiSync AI.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="pt-6">
                  <blockquote className="text-muted-foreground">
                    <p>"{testimonial.quote}"</p>
                  </blockquote>
                </CardContent>
                <div className="flex items-center gap-4 p-6 bg-muted/50">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-brand-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
const faqs = [
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial for our Starter and Pro plans. No credit card is required to get started. You can explore all the features and see how LogiSync AI can benefit your business.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Absolutely. You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of the current billing period, and you will not be charged again.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, including Visa, Mastercard, and American Express. All payments are processed securely through Stripe.',
  },
  {
    question: 'How is my data secured?',
    answer: 'We take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and are hosted on secure, reliable infrastructure to ensure your data is always safe.',
  },
];
export function FAQSection() {
  return (
    <section id="faq" className="bg-brand-neutral-bg py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="mt-16">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
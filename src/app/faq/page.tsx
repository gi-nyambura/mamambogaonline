
import { AppShell } from "@/components/layout/AppShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

const faqItems = [
  {
    question: "How does Mama Mboga work?",
    answer: "Mama Mboga connects you directly with local farmers and vendors. You can browse available produce, place an order, and have it delivered to your doorstep or a convenient pickup location.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, Flutterwave (for card payments), and Cash on Delivery for eligible orders.",
  },
  {
    question: "How fresh is the produce?",
    answer: "Our platform emphasizes freshness. Many products come directly from farms and are listed with freshness indicators. We strive to minimize the time between harvest and delivery.",
  },
  {
    question: "Can I become a seller on Mama Mboga?",
    answer: "Yes! We welcome farmers and vendors to join our platform. Please visit the 'Seller Signup' section or contact us for more information on how to register.",
  },
  {
    question: "What are your delivery areas?",
    answer: "Currently, we primarily serve Nairobi and its environs. We are constantly expanding our reach. You can check available delivery locations during checkout.",
  },
];

export default function FAQPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <HelpCircle className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Frequently Asked Questions
            </h1>
        </div>
        <Card className="shadow-lg max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="font-poppins">Common Questions</CardTitle>
                <CardDescription>Find answers to common queries about Mama Mboga.</CardDescription>
            </CardHeader>
            <CardContent>
                {faqItems.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left hover:no-underline">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                        {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                ) : (
                <p className="text-muted-foreground text-center py-4">No FAQs available at the moment.</p>
                )}
            </CardContent>
        </Card>
        <p className="mt-12 text-center text-muted-foreground">
          More FAQs will be added here.
        </p>
      </div>
    </AppShell>
  );
}

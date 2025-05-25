
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function TermsPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <FileText className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Terms and Conditions
            </h1>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-poppins">Our Service Agreement</CardTitle>
            <CardDescription>Please read these terms carefully before using our platform.</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2 className="font-poppins">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Mama Mboga platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms").
              If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="font-poppins">2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times.
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>

            <h2 className="font-poppins">3. Purchases</h2>
            <p>
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply
              certain information relevant to your Purchase including, without limitation, your name, contact information, delivery address, and payment details.
            </p>
            
            <h2 className="font-poppins">4. Content</h2>
            <p>
              Our Service allows sellers to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content").
              You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>

            <h2 className="font-poppins">5. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain
              the exclusive property of Mama Mboga and its licensors.
            </p>

            <h2 className="font-poppins">6. Limitation Of Liability</h2>
            <p>
             In no event shall Mama Mboga, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
             incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
             intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="font-poppins">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
            </p>

            <h2 className="font-poppins">8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
              What constitutes a material change will be determined at our sole discretion.
            </p>

            <p className="mt-6 text-center text-muted-foreground">
              This is a summary of terms. Full legal document to be provided. Last updated: [Current Date].
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

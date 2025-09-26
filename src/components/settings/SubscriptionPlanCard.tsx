import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
const currentPlanFeatures = [
  "AI Demand Forecasting (Advanced)",
  "Automated Inventory Reordering",
  "AI Route Optimization",
  "Advanced Analytics & Reporting",
  "API Access",
];
export function SubscriptionPlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <span className="font-semibold text-brand-primary">Pro</span> plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Features included in your plan:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {currentPlanFeatures.map((feature) => (
              <li key={feature} className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-semibold">Want to upgrade?</p>
            <p className="text-sm text-muted-foreground">
              Get custom AI models and dedicated support with our Enterprise plan.
            </p>
          </div>
          <Button>Contact Sales</Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Your plan renews on July 30, 2024. <Button variant="link" className="p-0 h-auto">Cancel Subscription</Button>
        </div>
      </CardContent>
    </Card>
  );
}
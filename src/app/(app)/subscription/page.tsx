import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Free",
    price: "₹0",
    frequency: "/month",
    description: "For individuals and small businesses just starting out.",
    features: [
      "5 Invoice Uploads/month",
      "Basic GST Filing",
      "Email Support",
    ],
    cta: "Your Current Plan",
    isCurrent: true,
  },
  {
    name: "Monthly",
    price: "₹499",
    frequency: "/month",
    description: "For growing businesses with more demanding needs.",
    features: [
      "100 Invoice Uploads/month",
      "GSTR-1 & GSTR-3B Generation",
      "Due Date Reminders",
      "Priority Email Support",
    ],
    cta: "Upgrade",
    isCurrent: false,
  },
  {
    name: "Yearly",
    price: "₹4,999",
    frequency: "/year",
    description: "For established businesses looking for the best value.",
    features: [
      "Unlimited Invoice Uploads",
      "All Filing Features",
      "Phone & Email Support",
      "Dedicated Account Manager",
    ],
    cta: "Upgrade",
    isCurrent: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your plan and explore upgrade options.
        </p>
      </div>

       <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Your Current Plan: Free Tier</CardTitle>
          <CardDescription>
            Your plan renews on August 31, 2024. You have used 3 of 5 available invoice uploads this month.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {pricingTiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.isCurrent ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div>
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">{tier.frequency}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={tier.isCurrent}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

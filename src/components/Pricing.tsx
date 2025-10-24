import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Daily Top 5 AI stock picks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Limited sentiment overview</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Basic search and filters</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/50 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">$25</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Unlimited searches & filters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">In-depth analytics & trends</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Custom alerts & notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Insider trading insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-invest" />
                  <span className="text-foreground">Volume spike analysis</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Loader2, 
  CheckCircle, 
  Shield, 
  Zap, 
  Crown,
  ArrowLeft,
  Calendar,
  DollarSign
} from "lucide-react";

export const SubscriptionPage = () => {
  const { user, subscribe, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple' | 'google'>('card');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  // Customer details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");

  const plans = {
    monthly: {
      price: 25,
      period: "month",
      savings: null,
      features: [
        "Unlimited AI stock recommendations",
        "Real-time market sentiment analysis",
        "Advanced technical indicators",
        "Custom watchlists",
        "Email alerts and notifications",
        "24/7 customer support"
      ]
    },
    yearly: {
      price: 250,
      period: "year",
      savings: "Save $50 (17% off)",
      features: [
        "Everything in Monthly plan",
        "Priority customer support",
        "Advanced portfolio analytics",
        "Exclusive market reports",
        "Early access to new features",
        "Personalized investment strategies"
      ]
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic customer info validation
    if (!firstName || !lastName || !email || !email.includes("@")) {
      setError("Please provide your first name, last name, and a valid email");
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        setError("Please fill in all card details");
        return;
      }
    }

    try {
      await subscribe(selectedPlan, { firstName, lastName, email });
      setSuccess(true);
    } catch (error) {
      setError("Payment failed. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to Pro!</h3>
              <p className="text-muted-foreground mb-4">
                Your subscription is now active. Enjoy unlimited access to all premium features.
              </p>
              <Button onClick={() => navigate("/")} className="w-full">
                Start Trading Smarter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")} 
              className="mb-4 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Upgrade to Pro
              </h1>
              <p className="text-xl text-muted-foreground">
                Unlock unlimited AI-powered stock insights and advanced analytics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Choose Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as 'monthly' | 'yearly')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="monthly" className="space-y-4">
                    <div className="text-center p-6 border border-border rounded-lg">
                      <div className="text-4xl font-bold text-foreground mb-2">
                        ${plans.monthly.price}
                        <span className="text-lg text-muted-foreground">/{plans.monthly.period}</span>
                      </div>
                      <p className="text-muted-foreground">Perfect for getting started</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="yearly" className="space-y-4">
                    <div className="text-center p-6 border border-border rounded-lg relative">
                      {plans.yearly.savings && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                          {plans.yearly.savings}
                        </Badge>
                      )}
                      <div className="text-4xl font-bold text-foreground mb-2">
                        ${plans.yearly.price}
                        <span className="text-lg text-muted-foreground">/{plans.yearly.period}</span>
                      </div>
                      <p className="text-muted-foreground">Best value for serious traders</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What's included:</h4>
                  {plans[selectedPlan].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  {/* Customer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Jane"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={paymentMethod === 'card' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('card')}
                        className="gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('paypal')}
                        className="gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        PayPal
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={paymentMethod === 'apple' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('apple')}
                        className="gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Apple Pay
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === 'google' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('google')}
                        className="gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Google Pay
                      </Button>
                    </div>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardholder">Cardholder Name</Label>
                        <Input
                          id="cardholder"
                          placeholder="John Doe"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alternative Payment Methods */}
                  {paymentMethod !== 'card' && (
                    <div className="text-center p-8 border border-border rounded-lg">
                      <div className="text-6xl mb-4">
                        {paymentMethod === 'paypal' && '🅿️'}
                        {paymentMethod === 'apple' && '🍎'}
                        {paymentMethod === 'google' && 'G'}
                      </div>
                      <p className="text-muted-foreground">
                        You'll be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 
                        paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your payment.
                      </p>
                    </div>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">
                          {selectedPlan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Billed {selectedPlan === 'monthly' ? 'monthly' : 'annually'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          ${plans[selectedPlan].price}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedPlan === 'monthly' ? 'per month' : 'per year'}
                        </p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Subscribe Now - ${plans[selectedPlan].price}
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    You can cancel your subscription at any time from your account settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Loader2, CheckCircle } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal = ({ onClose }: AuthModalProps) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await login(email);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError("Failed to create account. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Welcome!</h3>
              <p className="text-muted-foreground mb-4">
                Your account has been created successfully. You can now access all features.
              </p>
              <Button onClick={onClose} className="w-full">
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create Your Account</CardTitle>
          <p className="text-center text-muted-foreground">
            Enter your email to get started with AI-powered stock insights
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground text-center">
              <p className="mb-2">By creating an account, you agree to:</p>
              <ul className="text-xs space-y-1">
                <li>• Receive AI-powered stock recommendations</li>
                <li>• Get daily market insights and analysis</li>
                <li>• Access premium features and tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

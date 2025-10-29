import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Shield } from "lucide-react";
import { AuthModal } from "./AuthModal";

export const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const scrollToTopPicks = () => {
    const element = document.getElementById('top-picks-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/subscribe');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">AI-Powered Market Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Trade Smarter with
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Real-Time AI Insights
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            NeuralStreet analyzes millions of data points from Reddit, X, insider trades, and market volumes to deliver actionable stock recommendations every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow px-8 py-6 text-lg" onClick={handleGetStarted}>
              <TrendingUp className="mr-2 h-5 w-5" />
              {user ? (user.isSubscribed ? 'View Dashboard' : 'Upgrade to Pro') : 'Get Started Free'}
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary px-8 py-6 text-lg" onClick={scrollToTopPicks}>
              <Search className="mr-2 h-5 w-5" />
              View Top 5 Picks
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <div className="text-invest text-3xl font-bold mb-2">Multi-Source</div>
              <p className="text-muted-foreground">Aggregates Reddit, X, news, and SEC filings</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <div className="text-primary text-3xl font-bold mb-2">AI-Driven</div>
              <p className="text-muted-foreground">Machine learning sentiment & volume analysis</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <div className="text-watch text-3xl font-bold mb-2">Daily Updates</div>
              <p className="text-muted-foreground">Fresh recommendations every market day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {showAuthModal && (
      <AuthModal onClose={() => setShowAuthModal(false)} />
    )}
    </>
  );
};

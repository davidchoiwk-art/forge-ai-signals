import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Forge.AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#picks" className="text-foreground hover:text-primary transition-colors">
              Top Picks
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

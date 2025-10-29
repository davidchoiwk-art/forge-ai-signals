import { StockCard } from "./StockCard";
import { SearchFilters } from "./SearchFilters";
import { Watchlist } from "./Watchlist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";

const mockStocks = [
  {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    price: 875.42,
    change: 5.67,
    signal: "invest" as const,
    volume: "142M",
    sentiment: "Bullish",
    industry: "Technology",
    description: "Leader in GPUs and AI compute; strong data center demand and platform ecosystem momentum.",
  },
  {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    price: 248.23,
    change: -2.34,
    signal: "watch" as const,
    volume: "89M",
    sentiment: "Mixed",
    industry: "Automotive",
    description: "EV leader scaling energy and autonomy; margins volatile amid pricing and competition.",
  },
  {
    ticker: "MSFT",
    company: "Microsoft Corporation",
    price: 425.67,
    change: 1.23,
    signal: "hold" as const,
    volume: "54M",
    sentiment: "Neutral",
    industry: "Technology",
    description: "Cloud and AI Copilot tailwinds; durable enterprise demand supports multi-year growth.",
  },
  {
    ticker: "META",
    company: "Meta Platforms, Inc.",
    price: 512.89,
    change: 3.45,
    signal: "invest" as const,
    volume: "78M",
    sentiment: "Bullish",
    industry: "Technology",
    description: "Reels monetization, AI-driven ads, and efficiency focus; Reality Labs is a wildcard.",
  },
  {
    ticker: "COIN",
    company: "Coinbase Global, Inc.",
    price: 189.34,
    change: -4.12,
    signal: "sell" as const,
    volume: "23M",
    sentiment: "Bearish",
    industry: "Finance",
    description: "Crypto cycle exposure; regulatory overhang and fee compression risks remain elevated.",
  },
];

export const TopPicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStockClick = (ticker: string) => {
    navigate(`/company/${ticker}`);
  };

  const handleUpgrade = () => {
    navigate('/subscribe');
  };

  return (
    <section id="top-picks-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="top-picks" className="w-full">
          <TabsList className="mb-8 w-full justify-center bg-muted/50">
            <TabsTrigger value="top-picks" className="text-lg">
              Top 5 AI Picks
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="text-lg">
              Watchlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-picks">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Today's Top 5 AI Picks
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our AI has analyzed millions of signals to bring you these actionable recommendations. Updated daily at market close.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <SearchFilters />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {mockStocks.map((stock) => (
                <div 
                  key={stock.ticker} 
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleStockClick(stock.ticker)}
                >
                  <StockCard {...stock} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              {user && user.isSubscribed ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Crown className="w-5 h-5" />
                  <span className="font-semibold">Pro Member - Full Access</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Limited access - Upgrade for full features</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Want unlimited access, advanced analytics, and custom alerts?
                  </p>
                  <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={handleUpgrade}>
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro - $25/month
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="watchlist">
            <Watchlist />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

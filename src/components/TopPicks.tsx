import { StockCard } from "./StockCard";

const mockStocks = [
  {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    price: 875.42,
    change: 5.67,
    signal: "invest" as const,
    volume: "142M",
    sentiment: "Bullish",
  },
  {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    price: 248.23,
    change: -2.34,
    signal: "watch" as const,
    volume: "89M",
    sentiment: "Mixed",
  },
  {
    ticker: "MSFT",
    company: "Microsoft Corporation",
    price: 425.67,
    change: 1.23,
    signal: "hold" as const,
    volume: "54M",
    sentiment: "Neutral",
  },
  {
    ticker: "META",
    company: "Meta Platforms, Inc.",
    price: 512.89,
    change: 3.45,
    signal: "invest" as const,
    volume: "78M",
    sentiment: "Bullish",
  },
  {
    ticker: "COIN",
    company: "Coinbase Global, Inc.",
    price: 189.34,
    change: -4.12,
    signal: "sell" as const,
    volume: "23M",
    sentiment: "Bearish",
  },
];

export const TopPicks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Today's Top 5 AI Picks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI has analyzed millions of signals to bring you these actionable recommendations. Updated daily at market close.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {mockStocks.map((stock) => (
            <StockCard key={stock.ticker} {...stock} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Want unlimited access, advanced analytics, and custom alerts?
          </p>
          <a href="#pricing" className="text-primary hover:text-primary/80 font-semibold mt-2 inline-block">
            Upgrade to Pro for $25/month →
          </a>
        </div>
      </div>
    </section>
  );
};

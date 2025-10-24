import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Signal = "invest" | "watch" | "hold" | "sell";

interface StockCardProps {
  ticker: string;
  company: string;
  price: number;
  change: number;
  signal: Signal;
  volume: string;
  sentiment: string;
}

const signalConfig = {
  invest: {
    label: "INVEST",
    color: "bg-invest/20 text-invest border-invest/50",
    shadow: "hover:shadow-invest",
  },
  watch: {
    label: "WATCH",
    color: "bg-watch/20 text-watch border-watch/50",
    shadow: "hover:shadow-watch",
  },
  hold: {
    label: "HOLD",
    color: "bg-hold/20 text-hold border-hold/50",
    shadow: "hover:shadow-hold",
  },
  sell: {
    label: "SELL",
    color: "bg-sell/20 text-sell border-sell/50",
    shadow: "hover:shadow-sell",
  },
};

export const StockCard = ({
  ticker,
  company,
  price,
  change,
  signal,
  volume,
  sentiment,
}: StockCardProps) => {
  const config = signalConfig[signal];
  const isPositive = change >= 0;

  return (
    <Card className={`bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 ${config.shadow}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{ticker}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          <Badge className={`${config.color} border font-semibold px-3 py-1`}>
            {config.label}
          </Badge>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-foreground">${price.toFixed(2)}</p>
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-invest" />
              ) : (
                <TrendingDown className="w-4 h-4 text-sell" />
              )}
              <span className={`text-sm font-semibold ${isPositive ? "text-invest" : "text-sell"}`}>
                {isPositive ? "+" : ""}{change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Volume</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {volume}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
            <p className="text-sm font-semibold text-foreground">{sentiment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { StockCard } from "./StockCard";
import { StockBrowser } from "./StockBrowser";
import { Plus, Pencil, Trash2, Check, X, Search, Lock, Crown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WatchlistItem {
  id: string;
  name: string;
  stocks: Array<{
    ticker: string;
    company: string;
    price: number;
    change: number;
    signal: "invest" | "watch" | "hold" | "sell";
    volume: string;
    sentiment: string;
  }>;
}

export const Watchlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlists, setWatchlists] = useState<WatchlistItem[]>([
    {
      id: "1",
      name: "Tech Watchlist",
      stocks: [
        {
          ticker: "AAPL",
          company: "Apple Inc.",
          price: 189.45,
          change: 2.34,
          signal: "watch",
          volume: "56M",
          sentiment: "Bullish",
        },
      ],
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [activeWatchlist, setActiveWatchlist] = useState("1");

  const addWatchlist = () => {
    const newId = Date.now().toString();
    setWatchlists([
      ...watchlists,
      {
        id: newId,
        name: `Watchlist ${watchlists.length + 1}`,
        stocks: [],
      },
    ]);
    setActiveWatchlist(newId);
  };

  const deleteWatchlist = (id: string) => {
    if (watchlists.length === 1) return;
    setWatchlists(watchlists.filter((w) => w.id !== id));
    if (activeWatchlist === id) {
      setActiveWatchlist(watchlists[0].id);
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = () => {
    if (editingId && editingName.trim()) {
      setWatchlists(
        watchlists.map((w) =>
          w.id === editingId ? { ...w, name: editingName.trim() } : w
        )
      );
    }
    setEditingId(null);
    setEditingName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const addStockToWatchlist = (stock: any) => {
    setWatchlists(
      watchlists.map((w) =>
        w.id === activeWatchlist
          ? { ...w, stocks: [...w.stocks, stock] }
          : w
      )
    );
  };

  const removeStockFromWatchlist = (ticker: string) => {
    setWatchlists(
      watchlists.map((w) =>
        w.id === activeWatchlist
          ? { ...w, stocks: w.stocks.filter((s) => s.ticker !== ticker) }
          : w
      )
    );
  };

  const getCurrentWatchlistTickers = () => {
    const currentWatchlist = watchlists.find((w) => w.id === activeWatchlist);
    return currentWatchlist ? currentWatchlist.stocks.map((s) => s.ticker) : [];
  };

  const handleUpgrade = () => {
    navigate('/subscribe');
  };

  // Show subscription prompt for non-subscribers
  if (!user?.isSubscribed) {
    return (
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Watchlists are Pro Features</CardTitle>
              <p className="text-muted-foreground">
                Create custom watchlists, track your favorite stocks, and get personalized alerts with a Pro subscription.
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Crown className="w-4 h-4" />
                  <span>Pro features include:</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Unlimited custom watchlists</li>
                  <li>• Real-time price alerts</li>
                  <li>• Advanced portfolio tracking</li>
                  <li>• Personalized recommendations</li>
                </ul>
              </div>
              <Button onClick={handleUpgrade} className="w-full" size="lg">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro - $25/month
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-foreground">My Watchlists</h3>
        <Button onClick={addWatchlist} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Watchlist
        </Button>
      </div>

      <Tabs value={activeWatchlist} onValueChange={setActiveWatchlist}>
        <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-muted/50 p-2">
          {watchlists.map((watchlist) => (
            <div key={watchlist.id} className="flex items-center gap-2 group">
              {editingId === watchlist.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="h-8 w-40"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={saveEdit}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={cancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <TabsTrigger value={watchlist.id} className="gap-2">
                    {watchlist.name}
                    <span className="text-xs opacity-70">
                      ({watchlist.stocks.length})
                    </span>
                  </TabsTrigger>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => startEditing(watchlist.id, watchlist.name)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    {watchlists.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={() => deleteWatchlist(watchlist.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </TabsList>

        {watchlists.map((watchlist) => (
          <TabsContent key={watchlist.id} value={watchlist.id} className="mt-6">
            {watchlist.stocks.length === 0 ? (
              <div className="text-center py-16 glass-card rounded-lg">
                <p className="text-muted-foreground mb-4">
                  This watchlist is empty. Add stocks to track them here.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Search className="w-4 h-4" />
                      Browse Stocks
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Stocks to Watchlist</DialogTitle>
                    </DialogHeader>
                    <StockBrowser 
                      onAddToWatchlist={addStockToWatchlist}
                      watchlistStocks={getCurrentWatchlistTickers()}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-foreground">
                    {watchlist.stocks.length} stock{watchlist.stocks.length !== 1 ? 's' : ''} in this watchlist
                  </h4>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add More Stocks
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add More Stocks to Watchlist</DialogTitle>
                      </DialogHeader>
                      <StockBrowser 
                        onAddToWatchlist={addStockToWatchlist}
                        watchlistStocks={getCurrentWatchlistTickers()}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {watchlist.stocks.map((stock) => (
                    <div key={stock.ticker} className="relative group">
                      <StockCard {...stock} />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeStockFromWatchlist(stock.ticker)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

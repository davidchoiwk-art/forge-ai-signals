import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { StockCard } from "./StockCard";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
                <Button variant="outline">Browse Stocks</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.stocks.map((stock) => (
                  <StockCard key={stock.ticker} {...stock} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

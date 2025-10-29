import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Energy",
  "Consumer Goods",
  "Real Estate",
  "Manufacturing",
  "Telecommunications",
];

const priceRanges = [
  { label: "Under $10", value: "0-10" },
  { label: "Under $50", value: "0-50" },
  { label: "Under $100", value: "0-100" },
  { label: "$100 - $500", value: "100-500" },
  { label: "Over $500", value: "500+" },
];

const marketTrends = [
  "High Growth",
  "High Volume",
  "Volatile",
  "Insider Buying",
  "Bullish Sentiment",
  "Bearish Sentiment",
];

export const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleTrend = (trend: string) => {
    setSelectedTrends((prev) =>
      prev.includes(trend) ? prev.filter((t) => t !== trend) : [...prev, trend]
    );
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedPriceRange(null);
    setSelectedTrends([]);
    setSearchQuery("");
  };

  const activeFilterCount =
    selectedIndustries.length +
    (selectedPriceRange ? 1 : 0) +
    selectedTrends.length;

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by company name or ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground px-2 py-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] bg-card border-border/50 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-foreground">Filter Stocks</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Refine your search with advanced filters
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Industries */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Industry
                  </h3>
                  {selectedIndustries.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIndustries([])}
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <Badge
                      key={industry}
                      variant={
                        selectedIndustries.includes(industry)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer transition-all ${
                        selectedIndustries.includes(industry)
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => toggleIndustry(industry)}
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Price Range
                  </h3>
                  {selectedPriceRange && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPriceRange(null)}
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Badge
                      key={range.value}
                      variant={
                        selectedPriceRange === range.value
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer transition-all ${
                        selectedPriceRange === range.value
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setSelectedPriceRange(range.value)}
                    >
                      {range.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Market Trends */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Market Trends
                  </h3>
                  {selectedTrends.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTrends([])}
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {marketTrends.map((trend) => (
                    <Badge
                      key={trend}
                      variant={
                        selectedTrends.includes(trend) ? "default" : "outline"
                      }
                      className={`cursor-pointer transition-all ${
                        selectedTrends.includes(trend)
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => toggleTrend(trend)}
                    >
                      {trend}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear All */}
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedIndustries.map((industry) => (
            <Badge
              key={industry}
              variant="secondary"
              className="bg-secondary/50 text-foreground"
            >
              {industry}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => toggleIndustry(industry)}
              />
            </Badge>
          ))}
          {selectedPriceRange && (
            <Badge
              variant="secondary"
              className="bg-secondary/50 text-foreground"
            >
              {priceRanges.find((r) => r.value === selectedPriceRange)?.label}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => setSelectedPriceRange(null)}
              />
            </Badge>
          )}
          {selectedTrends.map((trend) => (
            <Badge
              key={trend}
              variant="secondary"
              className="bg-secondary/50 text-foreground"
            >
              {trend}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => toggleTrend(trend)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

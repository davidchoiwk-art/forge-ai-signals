import { useState, useMemo } from "react";
import { Search, Plus, Star, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { StockCard } from "./StockCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for stocks - Expanded database
const allStocks = [
  // Technology Giants
  {
    ticker: "AAPL",
    company: "Apple Inc.",
    price: 189.45,
    change: 2.34,
    signal: "watch" as const,
    volume: "56M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    price: 875.42,
    change: 5.67,
    signal: "invest" as const,
    volume: "142M",
    sentiment: "Bullish",
    industry: "Technology",
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
  },
  {
    ticker: "GOOGL",
    company: "Alphabet Inc.",
    price: 142.56,
    change: 1.89,
    signal: "invest" as const,
    volume: "45M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "AMZN",
    company: "Amazon.com, Inc.",
    price: 156.78,
    change: -0.45,
    signal: "hold" as const,
    volume: "67M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
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
  },
  {
    ticker: "NFLX",
    company: "Netflix, Inc.",
    price: 478.23,
    change: 1.45,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Neutral",
    industry: "Technology",
  },
  {
    ticker: "CRM",
    company: "Salesforce, Inc.",
    price: 267.89,
    change: 0.78,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Technology",
  },
  {
    ticker: "ADBE",
    company: "Adobe Inc.",
    price: 589.34,
    change: 2.12,
    signal: "invest" as const,
    volume: "6M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "INTC",
    company: "Intel Corporation",
    price: 45.67,
    change: -1.23,
    signal: "hold" as const,
    volume: "34M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "AMD",
    company: "Advanced Micro Devices, Inc.",
    price: 156.78,
    change: 3.45,
    signal: "invest" as const,
    volume: "67M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "ORCL",
    company: "Oracle Corporation",
    price: 123.45,
    change: 0.89,
    signal: "hold" as const,
    volume: "15M",
    sentiment: "Neutral",
    industry: "Technology",
  },
  {
    ticker: "IBM",
    company: "International Business Machines Corporation",
    price: 189.23,
    change: 1.12,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Technology",
  },
  {
    ticker: "CSCO",
    company: "Cisco Systems, Inc.",
    price: 56.78,
    change: -0.45,
    signal: "hold" as const,
    volume: "23M",
    sentiment: "Neutral",
    industry: "Technology",
  },

  // Finance & Banking
  {
    ticker: "JPM",
    company: "JPMorgan Chase & Co.",
    price: 198.34,
    change: 0.78,
    signal: "watch" as const,
    volume: "23M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "BAC",
    company: "Bank of America Corporation",
    price: 34.56,
    change: 0.23,
    signal: "hold" as const,
    volume: "45M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "WFC",
    company: "Wells Fargo & Company",
    price: 45.67,
    change: -0.12,
    signal: "hold" as const,
    volume: "28M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "GS",
    company: "Goldman Sachs Group, Inc.",
    price: 456.78,
    change: 2.34,
    signal: "watch" as const,
    volume: "3M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "MS",
    company: "Morgan Stanley",
    price: 98.45,
    change: 1.45,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "V",
    company: "Visa Inc.",
    price: 278.45,
    change: 2.12,
    signal: "invest" as const,
    volume: "12M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "MA",
    company: "Mastercard Incorporated",
    price: 456.78,
    change: 1.89,
    signal: "invest" as const,
    volume: "8M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "AXP",
    company: "American Express Company",
    price: 189.23,
    change: 0.67,
    signal: "hold" as const,
    volume: "6M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "PYPL",
    company: "PayPal Holdings, Inc.",
    price: 67.89,
    change: -2.34,
    signal: "watch" as const,
    volume: "15M",
    sentiment: "Mixed",
    industry: "Finance",
  },
  {
    ticker: "SQ",
    company: "Block, Inc.",
    price: 78.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Finance",
  },

  // Healthcare & Pharmaceuticals
  {
    ticker: "JNJ",
    company: "Johnson & Johnson",
    price: 167.89,
    change: -1.23,
    signal: "hold" as const,
    volume: "18M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },
  {
    ticker: "UNH",
    company: "UnitedHealth Group Inc.",
    price: 523.67,
    change: 1.45,
    signal: "invest" as const,
    volume: "15M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "PFE",
    company: "Pfizer Inc.",
    price: 28.45,
    change: -0.78,
    signal: "hold" as const,
    volume: "45M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },
  {
    ticker: "ABBV",
    company: "AbbVie Inc.",
    price: 156.78,
    change: 0.45,
    signal: "hold" as const,
    volume: "12M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },
  {
    ticker: "MRK",
    company: "Merck & Co., Inc.",
    price: 123.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "18M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "TMO",
    company: "Thermo Fisher Scientific Inc.",
    price: 567.89,
    change: 2.34,
    signal: "invest" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "ABT",
    company: "Abbott Laboratories",
    price: 112.34,
    change: 0.67,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },
  {
    ticker: "DHR",
    company: "Danaher Corporation",
    price: 234.56,
    change: 1.45,
    signal: "watch" as const,
    volume: "3M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "BMY",
    company: "Bristol Myers Squibb Company",
    price: 67.89,
    change: -0.45,
    signal: "hold" as const,
    volume: "12M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },
  {
    ticker: "AMGN",
    company: "Amgen Inc.",
    price: 289.45,
    change: 0.89,
    signal: "hold" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },

  // Consumer Goods & Retail
  {
    ticker: "PG",
    company: "Procter & Gamble Co.",
    price: 156.23,
    change: 0.34,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "KO",
    company: "The Coca-Cola Company",
    price: 59.45,
    change: 0.23,
    signal: "hold" as const,
    volume: "15M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "PEP",
    company: "PepsiCo, Inc.",
    price: 167.89,
    change: 0.45,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "WMT",
    company: "Walmart Inc.",
    price: 167.45,
    change: 0.78,
    signal: "hold" as const,
    volume: "12M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "HD",
    company: "The Home Depot, Inc.",
    price: 345.67,
    change: 1.23,
    signal: "watch" as const,
    volume: "6M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "MCD",
    company: "McDonald's Corporation",
    price: 289.45,
    change: 0.67,
    signal: "hold" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "NKE",
    company: "Nike, Inc.",
    price: 98.45,
    change: 1.45,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "SBUX",
    company: "Starbucks Corporation",
    price: 98.45,
    change: -0.45,
    signal: "hold" as const,
    volume: "6M",
    sentiment: "Mixed",
    industry: "Consumer Goods",
  },
  {
    ticker: "DIS",
    company: "The Walt Disney Company",
    price: 98.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Consumer Goods",
  },
  {
    ticker: "CMCSA",
    company: "Comcast Corporation",
    price: 45.67,
    change: 0.34,
    signal: "hold" as const,
    volume: "15M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },

  // Energy & Utilities
  {
    ticker: "XOM",
    company: "Exxon Mobil Corporation",
    price: 112.34,
    change: 1.45,
    signal: "watch" as const,
    volume: "18M",
    sentiment: "Bullish",
    industry: "Energy",
  },
  {
    ticker: "CVX",
    company: "Chevron Corporation",
    price: 156.78,
    change: 0.89,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Energy",
  },
  {
    ticker: "COP",
    company: "ConocoPhillips",
    price: 123.45,
    change: 2.34,
    signal: "watch" as const,
    volume: "6M",
    sentiment: "Bullish",
    industry: "Energy",
  },
  {
    ticker: "EOG",
    company: "EOG Resources, Inc.",
    price: 134.56,
    change: 1.67,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Bullish",
    industry: "Energy",
  },
  {
    ticker: "SLB",
    company: "Schlumberger Limited",
    price: 56.78,
    change: 0.45,
    signal: "hold" as const,
    volume: "12M",
    sentiment: "Neutral",
    industry: "Energy",
  },

  // Industrial & Manufacturing
  {
    ticker: "BA",
    company: "The Boeing Company",
    price: 234.56,
    change: 2.34,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Manufacturing",
  },
  {
    ticker: "CAT",
    company: "Caterpillar Inc.",
    price: 345.67,
    change: 1.23,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Bullish",
    industry: "Manufacturing",
  },
  {
    ticker: "GE",
    company: "General Electric Company",
    price: 156.78,
    change: 0.67,
    signal: "hold" as const,
    volume: "15M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },
  {
    ticker: "MMM",
    company: "3M Company",
    price: 98.45,
    change: -0.45,
    signal: "hold" as const,
    volume: "6M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },
  {
    ticker: "HON",
    company: "Honeywell International Inc.",
    price: 198.34,
    change: 0.78,
    signal: "hold" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },

  // Telecommunications
  {
    ticker: "VZ",
    company: "Verizon Communications Inc.",
    price: 38.45,
    change: 0.23,
    signal: "hold" as const,
    volume: "18M",
    sentiment: "Neutral",
    industry: "Telecommunications",
  },
  {
    ticker: "T",
    company: "AT&T Inc.",
    price: 16.78,
    change: -0.12,
    signal: "hold" as const,
    volume: "45M",
    sentiment: "Neutral",
    industry: "Telecommunications",
  },
  {
    ticker: "TMUS",
    company: "T-Mobile US, Inc.",
    price: 156.78,
    change: 1.45,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Bullish",
    industry: "Telecommunications",
  },

  // Real Estate
  {
    ticker: "AMT",
    company: "American Tower Corporation",
    price: 198.34,
    change: 0.67,
    signal: "hold" as const,
    volume: "3M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },
  {
    ticker: "PLD",
    company: "Prologis, Inc.",
    price: 123.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Bullish",
    industry: "Real Estate",
  },
  {
    ticker: "CCI",
    company: "Crown Castle Inc.",
    price: 98.45,
    change: 0.45,
    signal: "hold" as const,
    volume: "3M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },

  // Additional Popular Stocks
  {
    ticker: "COIN",
    company: "Coinbase Global, Inc.",
    price: 189.34,
    change: -4.12,
    signal: "sell" as const,
    volume: "23M",
    sentiment: "Bearish",
    industry: "Finance",
  },
  {
    ticker: "ROKU",
    company: "Roku, Inc.",
    price: 67.89,
    change: 2.34,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "ZM",
    company: "Zoom Video Communications, Inc.",
    price: 78.45,
    change: -1.23,
    signal: "hold" as const,
    volume: "6M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "PTON",
    company: "Peloton Interactive, Inc.",
    price: 4.56,
    change: -2.34,
    signal: "sell" as const,
    volume: "15M",
    sentiment: "Bearish",
    industry: "Consumer Goods",
  },
  {
    ticker: "UBER",
    company: "Uber Technologies, Inc.",
    price: 67.89,
    change: 1.45,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "LYFT",
    company: "Lyft, Inc.",
    price: 12.34,
    change: -0.67,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "SNAP",
    company: "Snap Inc.",
    price: 11.23,
    change: 0.45,
    signal: "watch" as const,
    volume: "18M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "TWTR",
    company: "Twitter, Inc.",
    price: 45.67,
    change: 1.23,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "SPOT",
    company: "Spotify Technology S.A.",
    price: 198.34,
    change: 2.34,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "SHOP",
    company: "Shopify Inc.",
    price: 67.89,
    change: 1.45,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Technology",
  },

  // Additional Technology Companies
  {
    ticker: "SNOW",
    company: "Snowflake Inc.",
    price: 156.78,
    change: 2.34,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "CRWD",
    company: "CrowdStrike Holdings, Inc.",
    price: 234.56,
    change: 1.67,
    signal: "invest" as const,
    volume: "3M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "OKTA",
    company: "Okta, Inc.",
    price: 78.45,
    change: 0.89,
    signal: "watch" as const,
    volume: "2M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "DOCU",
    company: "DocuSign, Inc.",
    price: 45.67,
    change: -1.23,
    signal: "hold" as const,
    volume: "5M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "TWLO",
    company: "Twilio Inc.",
    price: 67.89,
    change: 1.45,
    signal: "watch" as const,
    volume: "3M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "SQ",
    company: "Block, Inc.",
    price: 78.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "PALANTIR",
    company: "Palantir Technologies Inc.",
    price: 23.45,
    change: 2.34,
    signal: "watch" as const,
    volume: "15M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "DDOG",
    company: "Datadog, Inc.",
    price: 123.45,
    change: 1.89,
    signal: "invest" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Technology",
  },
  {
    ticker: "NET",
    company: "Cloudflare, Inc.",
    price: 89.45,
    change: 0.67,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Technology",
  },
  {
    ticker: "FIVN",
    company: "Five9, Inc.",
    price: 67.89,
    change: 1.23,
    signal: "watch" as const,
    volume: "1M",
    sentiment: "Mixed",
    industry: "Technology",
  },

  // Additional Healthcare Companies
  {
    ticker: "GILD",
    company: "Gilead Sciences, Inc.",
    price: 78.45,
    change: 0.45,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Healthcare",
  },
  {
    ticker: "BIIB",
    company: "Biogen Inc.",
    price: 234.56,
    change: 1.23,
    signal: "watch" as const,
    volume: "2M",
    sentiment: "Mixed",
    industry: "Healthcare",
  },
  {
    ticker: "REGN",
    company: "Regeneron Pharmaceuticals, Inc.",
    price: 789.45,
    change: 2.34,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "VRTX",
    company: "Vertex Pharmaceuticals Incorporated",
    price: 456.78,
    change: 1.67,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "ILMN",
    company: "Illumina, Inc.",
    price: 123.45,
    change: -0.89,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Mixed",
    industry: "Healthcare",
  },
  {
    ticker: "ISRG",
    company: "Intuitive Surgical, Inc.",
    price: 345.67,
    change: 1.45,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Healthcare",
  },
  {
    ticker: "MRNA",
    company: "Moderna, Inc.",
    price: 89.45,
    change: -2.34,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Healthcare",
  },
  {
    ticker: "BNTX",
    company: "BioNTech SE",
    price: 98.45,
    change: -1.23,
    signal: "watch" as const,
    volume: "3M",
    sentiment: "Mixed",
    industry: "Healthcare",
  },

  // Additional Finance Companies
  {
    ticker: "BLK",
    company: "BlackRock, Inc.",
    price: 789.45,
    change: 1.23,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "SCHW",
    company: "Charles Schwab Corporation",
    price: 67.89,
    change: 0.67,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "ICE",
    company: "Intercontinental Exchange, Inc.",
    price: 123.45,
    change: 0.89,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "CME",
    company: "CME Group Inc.",
    price: 234.56,
    change: 1.45,
    signal: "watch" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "MCO",
    company: "Moody's Corporation",
    price: 345.67,
    change: 0.67,
    signal: "hold" as const,
    volume: "1M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "SPGI",
    company: "S&P Global Inc.",
    price: 456.78,
    change: 1.23,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Finance",
  },
  {
    ticker: "FIS",
    company: "Fidelity National Information Services, Inc.",
    price: 67.89,
    change: 0.45,
    signal: "hold" as const,
    volume: "3M",
    sentiment: "Neutral",
    industry: "Finance",
  },
  {
    ticker: "FISV",
    company: "Fiserv, Inc.",
    price: 123.45,
    change: 0.78,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Neutral",
    industry: "Finance",
  },

  // Additional Consumer Goods Companies
  {
    ticker: "TGT",
    company: "Target Corporation",
    price: 156.78,
    change: 1.23,
    signal: "watch" as const,
    volume: "6M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "LOW",
    company: "Lowe's Companies, Inc.",
    price: 234.56,
    change: 0.89,
    signal: "hold" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "COST",
    company: "Costco Wholesale Corporation",
    price: 567.89,
    change: 1.45,
    signal: "invest" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "TJX",
    company: "The TJX Companies, Inc.",
    price: 89.45,
    change: 0.67,
    signal: "hold" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "BKNG",
    company: "Booking Holdings Inc.",
    price: 3456.78,
    change: 2.34,
    signal: "invest" as const,
    volume: "0.5M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "MAR",
    company: "Marriott International, Inc.",
    price: 234.56,
    change: 1.23,
    signal: "watch" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "HLT",
    company: "Hilton Worldwide Holdings Inc.",
    price: 156.78,
    change: 0.89,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "YUM",
    company: "Yum! Brands, Inc.",
    price: 123.45,
    change: 0.45,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Neutral",
    industry: "Consumer Goods",
  },
  {
    ticker: "CMG",
    company: "Chipotle Mexican Grill, Inc.",
    price: 2345.67,
    change: 1.67,
    signal: "invest" as const,
    volume: "0.3M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },
  {
    ticker: "LULU",
    company: "Lululemon Athletica Inc.",
    price: 456.78,
    change: 2.12,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Consumer Goods",
  },

  // Additional Energy Companies
  {
    ticker: "KMI",
    company: "Kinder Morgan, Inc.",
    price: 18.45,
    change: 0.23,
    signal: "hold" as const,
    volume: "12M",
    sentiment: "Neutral",
    industry: "Energy",
  },
  {
    ticker: "WMB",
    company: "The Williams Companies, Inc.",
    price: 34.56,
    change: 0.45,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Neutral",
    industry: "Energy",
  },
  {
    ticker: "OKE",
    company: "ONEOK, Inc.",
    price: 67.89,
    change: 0.67,
    signal: "hold" as const,
    volume: "4M",
    sentiment: "Neutral",
    industry: "Energy",
  },
  {
    ticker: "PSX",
    company: "Phillips 66",
    price: 123.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "3M",
    sentiment: "Bullish",
    industry: "Energy",
  },
  {
    ticker: "VLO",
    company: "Valero Energy Corporation",
    price: 134.56,
    change: 1.45,
    signal: "watch" as const,
    volume: "3M",
    sentiment: "Bullish",
    industry: "Energy",
  },
  {
    ticker: "MPC",
    company: "Marathon Petroleum Corporation",
    price: 156.78,
    change: 1.67,
    signal: "watch" as const,
    volume: "4M",
    sentiment: "Bullish",
    industry: "Energy",
  },

  // Additional Industrial Companies
  {
    ticker: "UPS",
    company: "United Parcel Service, Inc.",
    price: 189.23,
    change: 0.78,
    signal: "hold" as const,
    volume: "3M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },
  {
    ticker: "FDX",
    company: "FedEx Corporation",
    price: 234.56,
    change: 1.23,
    signal: "watch" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Manufacturing",
  },
  {
    ticker: "RTX",
    company: "RTX Corporation",
    price: 98.45,
    change: 0.45,
    signal: "hold" as const,
    volume: "6M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },
  {
    ticker: "LMT",
    company: "Lockheed Martin Corporation",
    price: 456.78,
    change: 1.45,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Manufacturing",
  },
  {
    ticker: "NOC",
    company: "Northrop Grumman Corporation",
    price: 456.78,
    change: 1.23,
    signal: "invest" as const,
    volume: "1M",
    sentiment: "Bullish",
    industry: "Manufacturing",
  },
  {
    ticker: "GD",
    company: "General Dynamics Corporation",
    price: 234.56,
    change: 0.89,
    signal: "hold" as const,
    volume: "1M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },
  {
    ticker: "EMR",
    company: "Emerson Electric Co.",
    price: 98.45,
    change: 0.67,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Neutral",
    industry: "Manufacturing",
  },
  {
    ticker: "ETN",
    company: "Eaton Corporation plc",
    price: 234.56,
    change: 1.12,
    signal: "watch" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Manufacturing",
  },

  // Additional Real Estate Companies
  {
    ticker: "EQIX",
    company: "Equinix, Inc.",
    price: 789.45,
    change: 1.23,
    signal: "invest" as const,
    volume: "0.5M",
    sentiment: "Bullish",
    industry: "Real Estate",
  },
  {
    ticker: "PSA",
    company: "Public Storage",
    price: 289.45,
    change: 0.45,
    signal: "hold" as const,
    volume: "1M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },
  {
    ticker: "EXR",
    company: "Extra Space Storage Inc.",
    price: 156.78,
    change: 0.67,
    signal: "hold" as const,
    volume: "1M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },
  {
    ticker: "AVB",
    company: "AvalonBay Communities, Inc.",
    price: 189.23,
    change: 0.34,
    signal: "hold" as const,
    volume: "1M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },
  {
    ticker: "EQR",
    company: "Equity Residential",
    price: 67.89,
    change: 0.23,
    signal: "hold" as const,
    volume: "2M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },
  {
    ticker: "MAA",
    company: "Mid-America Apartment Communities, Inc.",
    price: 156.78,
    change: 0.45,
    signal: "hold" as const,
    volume: "1M",
    sentiment: "Neutral",
    industry: "Real Estate",
  },

  // Additional Telecommunications Companies
  {
    ticker: "CHTR",
    company: "Charter Communications, Inc.",
    price: 345.67,
    change: 1.23,
    signal: "watch" as const,
    volume: "2M",
    sentiment: "Bullish",
    industry: "Telecommunications",
  },
  {
    ticker: "CMCSA",
    company: "Comcast Corporation",
    price: 45.67,
    change: 0.34,
    signal: "hold" as const,
    volume: "15M",
    sentiment: "Neutral",
    industry: "Telecommunications",
  },
  {
    ticker: "DISCA",
    company: "Discovery, Inc.",
    price: 23.45,
    change: -0.45,
    signal: "hold" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Telecommunications",
  },

  // Additional Popular Growth Stocks
  {
    ticker: "ARKK",
    company: "ARK Innovation ETF",
    price: 45.67,
    change: 2.34,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Finance",
  },
  {
    ticker: "PLTR",
    company: "Palantir Technologies Inc.",
    price: 23.45,
    change: 2.34,
    signal: "watch" as const,
    volume: "15M",
    sentiment: "Mixed",
    industry: "Technology",
  },
  {
    ticker: "WISH",
    company: "ContextLogic Inc.",
    price: 1.23,
    change: -5.67,
    signal: "sell" as const,
    volume: "25M",
    sentiment: "Bearish",
    industry: "Consumer Goods",
  },
  {
    ticker: "CLOV",
    company: "Clover Health Investments, Corp.",
    price: 2.34,
    change: -3.45,
    signal: "sell" as const,
    volume: "18M",
    sentiment: "Bearish",
    industry: "Healthcare",
  },
  {
    ticker: "WISH",
    company: "ContextLogic Inc.",
    price: 1.23,
    change: -5.67,
    signal: "sell" as const,
    volume: "25M",
    sentiment: "Bearish",
    industry: "Consumer Goods",
  },
  {
    ticker: "SOFI",
    company: "SoFi Technologies, Inc.",
    price: 8.45,
    change: 1.23,
    signal: "watch" as const,
    volume: "12M",
    sentiment: "Mixed",
    industry: "Finance",
  },
  {
    ticker: "HOOD",
    company: "Robinhood Markets, Inc.",
    price: 12.34,
    change: 0.45,
    signal: "watch" as const,
    volume: "15M",
    sentiment: "Mixed",
    industry: "Finance",
  },
  {
    ticker: "AFRM",
    company: "Affirm Holdings, Inc.",
    price: 23.45,
    change: 1.67,
    signal: "watch" as const,
    volume: "8M",
    sentiment: "Mixed",
    industry: "Finance",
  },
  {
    ticker: "UPST",
    company: "Upstart Holdings, Inc.",
    price: 34.56,
    change: 2.12,
    signal: "watch" as const,
    volume: "6M",
    sentiment: "Mixed",
    industry: "Finance",
  },
  {
    ticker: "OPEN",
    company: "Opendoor Technologies Inc.",
    price: 2.34,
    change: -1.23,
    signal: "sell" as const,
    volume: "12M",
    sentiment: "Bearish",
    industry: "Real Estate",
  },
];

// Recommended stocks based on AI analysis
const recommendedStocks = [
  {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    price: 875.42,
    change: 5.67,
    signal: "invest" as const,
    volume: "142M",
    sentiment: "Bullish",
    industry: "Technology",
    reason: "Strong AI chip demand",
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
    reason: "VR/AR growth potential",
  },
  {
    ticker: "GOOGL",
    company: "Alphabet Inc.",
    price: 142.56,
    change: 1.89,
    signal: "invest" as const,
    volume: "45M",
    sentiment: "Bullish",
    industry: "Technology",
    reason: "AI integration across products",
  },
  {
    ticker: "V",
    company: "Visa Inc.",
    price: 278.45,
    change: 2.12,
    signal: "invest" as const,
    volume: "12M",
    sentiment: "Bullish",
    industry: "Finance",
    reason: "Digital payment growth",
  },
  {
    ticker: "UNH",
    company: "UnitedHealth Group Inc.",
    price: 523.67,
    change: 1.45,
    signal: "invest" as const,
    volume: "15M",
    sentiment: "Bullish",
    industry: "Healthcare",
    reason: "Healthcare sector strength",
  },
];

interface StockBrowserProps {
  onAddToWatchlist: (stock: any) => void;
  watchlistStocks: string[]; // Array of tickers already in watchlist
}

export const StockBrowser = ({ onAddToWatchlist, watchlistStocks }: StockBrowserProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");

  // Filter stocks based on search query
  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) return allStocks;
    
    const query = searchQuery.toLowerCase();
    return allStocks.filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(query) ||
        stock.company.toLowerCase().includes(query) ||
        stock.industry.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const { user } = useAuth();

  const handleAddToWatchlist = (stock: any) => {
    if (!user?.isSubscribed) {
      navigate('/subscribe');
      return;
    }
    onAddToWatchlist(stock);
  };

  const handleStockClick = (ticker: string) => {
    // Close the dialog first, then navigate
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) {
      const closeButton = dialog.querySelector('[data-state="open"]');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    }
    // Small delay to ensure dialog closes before navigation
    setTimeout(() => {
      navigate(`/company/${ticker}`);
    }, 100);
  };

  const isInWatchlist = (ticker: string) => watchlistStocks.includes(ticker);

  // Limit visible results for free users
  const visibleRecommended = (user?.isSubscribed ? recommendedStocks : recommendedStocks.slice(0, 10));
  const visibleFiltered = (user?.isSubscribed ? filteredStocks : filteredStocks.slice(0, 10));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">Browse Stocks</h3>
        <p className="text-muted-foreground">
          Search for stocks or explore our AI-recommended picks
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search by company name or ticker..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Tabs for Recommended vs Search Results */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-center bg-muted/50">
          <TabsTrigger value="recommended" className="gap-2">
            <Star className="w-4 h-4" />
            Recommended
          </TabsTrigger>
          <TabsTrigger value="search" className="gap-2">
            <Search className="w-4 h-4" />
            Search Results
          </TabsTrigger>
        </TabsList>

        {/* Recommended Stocks Tab */}
        <TabsContent value="recommended" className="mt-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-foreground mb-2">
              AI-Recommended Stocks
            </h4>
            <p className="text-muted-foreground">
              Our AI has identified these stocks with strong potential based on current market signals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleRecommended.map((stock) => (
              <Card 
                key={stock.ticker} 
                className="bg-gradient-card border-border/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleStockClick(stock.ticker)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{stock.ticker}</h3>
                      <p className="text-sm text-muted-foreground">{stock.company}</p>
                    </div>
                    <Badge className="bg-invest/20 text-invest border-invest/50 font-semibold px-3 py-1">
                      INVEST
                    </Badge>
                  </div>

                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Price per share</p>
                      <p className="text-3xl font-bold text-foreground">${stock.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <TrendingUp className="w-4 h-4 text-invest" />
                        <span className="text-sm font-semibold text-invest">
                          +{stock.change.toFixed(2)}%
                        </span>
                        <span className="text-xs text-muted-foreground">Daily change</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">AI Recommendation</p>
                    <p className="text-sm font-semibold text-foreground">{stock.reason}</p>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWatchlist(stock);
                    }}
                    disabled={isInWatchlist(stock.ticker)}
                    className="w-full gap-2"
                    variant={isInWatchlist(stock.ticker) ? "outline" : "default"}
                  >
                    <Plus className="w-4 h-4" />
                    {isInWatchlist(stock.ticker) ? "Already Added" : "Add to Watchlist"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Search Results Tab */}
        <TabsContent value="search" className="mt-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-foreground mb-2">
              Search Results
            </h4>
            <p className="text-muted-foreground">
              {searchQuery ? `Found ${filteredStocks.length} stocks matching "${searchQuery}"` : "Enter a search term to find stocks"}
            </p>
          </div>

          {visibleFiltered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleFiltered.map((stock) => (
                <Card 
                  key={stock.ticker} 
                  className="bg-gradient-card border-border/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => handleStockClick(stock.ticker)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{stock.ticker}</h3>
                        <p className="text-sm text-muted-foreground">{stock.company}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {stock.industry}
                        </Badge>
                      </div>
                      <Badge className={`font-semibold px-3 py-1 ${
                        stock.signal === 'invest' ? 'bg-invest/20 text-invest border-invest/50' :
                        stock.signal === 'watch' ? 'bg-watch/20 text-watch border-watch/50' :
                        stock.signal === 'hold' ? 'bg-hold/20 text-hold border-hold/50' :
                        'bg-sell/20 text-sell border-sell/50'
                      }`}>
                        {stock.signal.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Price per share</p>
                        <p className="text-3xl font-bold text-foreground">${stock.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-invest" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-sell rotate-180" />
                          )}
                          <span className={`text-sm font-semibold ${stock.change >= 0 ? 'text-invest' : 'text-sell'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                          </span>
                          <span className="text-xs text-muted-foreground">Daily change</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Volume</p>
                        <p className="text-sm font-semibold text-foreground">{stock.volume}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
                        <p className="text-sm font-semibold text-foreground">{stock.sentiment}</p>
                      </div>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWatchlist(stock);
                      }}
                      disabled={isInWatchlist(stock.ticker)}
                      className="w-full gap-2"
                      variant={isInWatchlist(stock.ticker) ? "outline" : "default"}
                    >
                      <Plus className="w-4 h-4" />
                      {isInWatchlist(stock.ticker) ? "Already Added" : "Add to Watchlist"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-16 glass-card rounded-lg">
              <p className="text-muted-foreground mb-4">
                No stocks found matching "{searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching with a different company name or ticker symbol
              </p>
            </div>
          ) : (
            <div className="text-center py-16 glass-card rounded-lg">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Start typing to search for stocks
              </p>
              <p className="text-sm text-muted-foreground">
                Search by company name, ticker symbol, or industry
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

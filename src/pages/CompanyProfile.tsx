import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Building2, Users, DollarSign, BarChart3, Newspaper, ExternalLink, Lock, Crown, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart, Legend } from "recharts";

// Mock data for company profiles
const companyProfiles: Record<string, any> = {
  AAPL: {
    ticker: "AAPL",
    company: "Apple Inc.",
    price: 189.45,
    change: 2.34,
    signal: "watch",
    volume: "56M",
    sentiment: "Bullish",
    industry: "Technology",
    marketCap: "2.95T",
    employees: "164,000",
    founded: "1976",
    headquarters: "Cupertino, CA",
    ceo: "Tim Cook",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company's flagship products include the iPhone, Mac, iPad, Apple Watch, and AirPods.",
    businessModel: "Apple operates through hardware sales, software services, and digital content. The company generates revenue through device sales, App Store commissions, iCloud subscriptions, Apple Music, and other services.",
    aiAnalysis: {
      status: "WATCH",
      confidence: "Medium",
      reasoning: "Apple shows mixed signals with strong iPhone 15 sales but concerns about China market exposure and high valuation. Services growth is positive, but hardware sales face headwinds in key markets.",
      keyFactors: [
        "iPhone 15 Pro Max showing strong demand with 3-4 week wait times",
        "Services revenue growing 16% YoY, improving margins",
        "China market showing signs of recovery after regulatory challenges",
        "High P/E ratio of 29.2 suggests premium valuation",
        "Strong balance sheet with $162B cash provides downside protection"
      ]
    },
    keyMetrics: {
      revenue: "394.3B",
      netIncome: "99.8B",
      peRatio: "29.2",
      dividendYield: "0.5%",
      beta: "1.28"
    },
    financials: {
      incomeStatement: {
        revenue: { current: "394.3B", previous: "365.8B", growth: "7.8%" },
        grossProfit: { current: "169.1B", previous: "152.8B", growth: "10.7%" },
        operatingIncome: { current: "114.3B", previous: "108.9B", growth: "5.0%" },
        netIncome: { current: "99.8B", previous: "94.7B", growth: "5.4%" },
        ebitda: { current: "130.5B", previous: "123.1B", growth: "6.0%" }
      },
      balanceSheet: {
        totalAssets: "352.8B",
        totalLiabilities: "258.5B",
        totalEquity: "94.3B",
        cashAndEquivalents: "162.1B",
        totalDebt: "95.3B",
        workingCapital: "45.2B"
      },
      ratios: {
        peRatio: "29.2",
        pegRatio: "1.8",
        priceToSales: "7.5",
        priceToBook: "39.1",
        debtToEquity: "1.01",
        currentRatio: "1.05",
        quickRatio: "0.98",
        returnOnEquity: "105.8%",
        returnOnAssets: "28.3%",
        grossMargin: "42.9%",
        operatingMargin: "29.0%",
        netMargin: "25.3%"
      },
      cashFlow: {
        operatingCashFlow: "110.5B",
        investingCashFlow: "-7.8B",
        financingCashFlow: "-109.1B",
        freeCashFlow: "99.5B",
        capex: "11.0B"
      }
    },
    historicalData: [
      { date: "2024-01", price: 185.92, volume: 45.2, high: 192.15, low: 178.30, ma5: 185.92, ma10: 185.92, ma200: 185.92 },
      { date: "2024-02", price: 182.52, volume: 52.8, high: 189.45, low: 175.20, ma5: 184.22, ma10: 184.22, ma200: 184.22 },
      { date: "2024-03", price: 170.12, volume: 67.3, high: 185.90, low: 165.45, ma5: 179.52, ma10: 179.52, ma200: 179.52 },
      { date: "2024-04", price: 169.30, volume: 48.7, high: 175.60, low: 162.80, ma5: 176.97, ma10: 176.97, ma200: 176.97 },
      { date: "2024-05", price: 190.29, volume: 89.4, high: 198.75, low: 168.90, ma5: 179.43, ma10: 179.43, ma200: 179.43 },
      { date: "2024-06", price: 210.45, volume: 76.2, high: 215.80, low: 185.30, ma5: 184.14, ma10: 184.14, ma200: 184.14 },
      { date: "2024-07", price: 195.83, volume: 58.9, high: 212.40, low: 188.15, ma5: 189.22, ma10: 189.22, ma200: 189.22 },
      { date: "2024-08", price: 189.45, volume: 56.0, high: 198.20, low: 182.10, ma5: 187.62, ma10: 187.62, ma200: 187.62 },
    ],
    news: [
      {
        title: "Apple Reports Strong Q3 Earnings with iPhone Sales Growth",
        source: "Reuters",
        date: "2024-08-15",
        url: "https://reuters.com/technology/apple-earnings",
        summary: "Apple exceeded expectations with iPhone sales up 12% year-over-year."
      },
      {
        title: "Apple Announces New AI Features for iOS 18",
        source: "TechCrunch",
        date: "2024-08-10",
        url: "https://techcrunch.com/apple-ai-features",
        summary: "Apple introduces advanced AI capabilities across its ecosystem."
      },
      {
        title: "Apple's Services Revenue Hits Record High",
        source: "Bloomberg",
        date: "2024-08-05",
        url: "https://bloomberg.com/apple-services",
        summary: "Services division revenue grows 15% driven by App Store and iCloud."
      }
    ]
  },
  NVDA: {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    price: 875.42,
    change: 5.67,
    signal: "invest",
    volume: "142M",
    sentiment: "Bullish",
    industry: "Technology",
    marketCap: "2.15T",
    employees: "29,600",
    founded: "1993",
    headquarters: "Santa Clara, CA",
    ceo: "Jensen Huang",
    description: "NVIDIA Corporation operates as a computing company worldwide. The company operates in two segments: Graphics and Compute & Networking. NVIDIA is a leading provider of graphics processing units (GPUs) and system-on-a-chip (SoC) units.",
    businessModel: "NVIDIA generates revenue through GPU sales for gaming, data center, professional visualization, and automotive markets. The company also provides software and services for AI, machine learning, and autonomous driving.",
    aiAnalysis: {
      status: "INVEST",
      confidence: "High",
      reasoning: "NVIDIA is the clear leader in AI infrastructure with unprecedented demand for its H100 and A100 GPUs. Data center revenue growth of 171% YoY demonstrates strong market position. AI adoption across industries continues to accelerate.",
      keyFactors: [
        "Data center revenue up 171% YoY to $47.5B, driven by AI demand",
        "H100 GPU supply constraints indicate strong demand",
        "CUDA ecosystem creates significant moat in AI development",
        "Partnerships with major cloud providers (AWS, Azure, GCP)",
        "AI inference market still in early stages with massive growth potential"
      ]
    },
    keyMetrics: {
      revenue: "60.9B",
      netIncome: "29.8B",
      peRatio: "65.4",
      dividendYield: "0.1%",
      beta: "1.68"
    },
    financials: {
      incomeStatement: {
        revenue: { current: "60.9B", previous: "26.9B", growth: "126.4%" },
        grossProfit: { current: "45.1B", previous: "19.2B", growth: "135.0%" },
        operatingIncome: { current: "33.0B", previous: "10.0B", growth: "230.0%" },
        netIncome: { current: "29.8B", previous: "4.4B", growth: "577.3%" },
        ebitda: { current: "35.2B", previous: "11.8B", growth: "198.3%" }
      },
      balanceSheet: {
        totalAssets: "65.3B",
        totalLiabilities: "15.8B",
        totalEquity: "49.5B",
        cashAndEquivalents: "31.4B",
        totalDebt: "9.7B",
        workingCapital: "28.2B"
      },
      ratios: {
        peRatio: "65.4",
        pegRatio: "0.8",
        priceToSales: "35.3",
        priceToBook: "43.4",
        debtToEquity: "0.20",
        currentRatio: "4.2",
        quickRatio: "3.8",
        returnOnEquity: "60.2%",
        returnOnAssets: "45.6%",
        grossMargin: "74.1%",
        operatingMargin: "54.2%",
        netMargin: "48.9%"
      },
      cashFlow: {
        operatingCashFlow: "28.9B",
        investingCashFlow: "-2.1B",
        financingCashFlow: "-15.2B",
        freeCashFlow: "26.8B",
        capex: "2.1B"
      }
    },
    historicalData: [
      { date: "2024-01", price: 721.33, volume: 28.5, high: 750.20, low: 695.40, ma5: 721.33, ma10: 721.33, ma200: 721.33 },
      { date: "2024-02", price: 788.17, volume: 35.2, high: 820.15, low: 710.80, ma5: 754.75, ma10: 754.75, ma200: 754.75 },
      { date: "2024-03", price: 875.28, volume: 42.8, high: 920.45, low: 780.30, ma5: 794.93, ma10: 794.93, ma200: 794.93 },
      { date: "2024-04", price: 762.00, volume: 38.7, high: 890.60, low: 720.15, ma5: 806.70, ma10: 806.70, ma200: 806.70 },
      { date: "2024-05", price: 1064.69, volume: 67.3, high: 1150.80, low: 750.90, ma5: 842.29, ma10: 842.29, ma200: 842.29 },
      { date: "2024-06", price: 130.78, volume: 89.4, high: 140.20, low: 120.45, ma5: 720.21, ma10: 720.21, ma200: 720.21 },
      { date: "2024-07", price: 125.22, volume: 76.2, high: 135.80, low: 115.30, ma5: 466.00, ma10: 466.00, ma200: 466.00 },
      { date: "2024-08", price: 875.42, volume: 142.0, high: 920.40, low: 820.15, ma5: 447.85, ma10: 447.85, ma200: 447.85 },
    ],
    news: [
      {
        title: "NVIDIA's AI Chip Demand Surges as Data Centers Expand",
        source: "Wall Street Journal",
        date: "2024-08-20",
        url: "https://wsj.com/nvidia-ai-demand",
        summary: "Data center revenue grows 171% year-over-year driven by AI workloads."
      },
      {
        title: "NVIDIA Partners with Major Cloud Providers for AI Infrastructure",
        source: "Forbes",
        date: "2024-08-18",
        url: "https://forbes.com/nvidia-cloud-partnerships",
        summary: "New partnerships accelerate AI adoption across enterprise markets."
      },
      {
        title: "NVIDIA's Gaming Revenue Shows Strong Recovery",
        source: "GameSpot",
        date: "2024-08-12",
        url: "https://gamespot.com/nvidia-gaming-revenue",
        summary: "RTX 40 series GPUs drive gaming segment growth in Q3."
      }
    ]
  },
  TSLA: {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    price: 248.23,
    change: -2.34,
    signal: "watch",
    volume: "89M",
    sentiment: "Mixed",
    industry: "Automotive",
    marketCap: "789.2B",
    employees: "140,000",
    founded: "2003",
    headquarters: "Austin, TX",
    ceo: "Elon Musk",
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments: Automotive and Energy Generation and Storage.",
    businessModel: "Tesla generates revenue through vehicle sales, energy storage systems, solar panel installations, and services. The company also operates Supercharger networks and provides Full Self-Driving software.",
    aiAnalysis: {
      status: "WATCH",
      confidence: "Medium",
      reasoning: "Tesla faces mixed signals with strong EV market position but execution challenges. Price cuts are boosting volume but hurting margins. FSD progress and energy business growth provide long-term optionality, but near-term execution remains volatile.",
      keyFactors: [
        "Vehicle deliveries up 35% YoY but margins compressed due to price cuts",
        "Full Self-Driving v12 showing promising progress with neural networks",
        "Energy storage business growing 40% YoY to $1.5B revenue",
        "Cybertruck production ramping but facing manufacturing challenges",
        "High beta of 2.31 indicates significant volatility and market sensitivity"
      ]
    },
    keyMetrics: {
      revenue: "96.8B",
      netIncome: "15.0B",
      peRatio: "52.7",
      dividendYield: "0%",
      beta: "2.31"
    },
    financials: {
      incomeStatement: {
        revenue: { current: "96.8B", previous: "81.5B", growth: "18.8%" },
        grossProfit: { current: "20.8B", previous: "20.8B", growth: "0.0%" },
        operatingIncome: { current: "8.9B", previous: "13.7B", growth: "-35.0%" },
        netIncome: { current: "15.0B", previous: "12.6B", growth: "19.0%" },
        ebitda: { current: "12.0B", previous: "15.8B", growth: "-24.1%" }
      },
      balanceSheet: {
        totalAssets: "106.6B",
        totalLiabilities: "64.4B",
        totalEquity: "42.2B",
        cashAndEquivalents: "29.1B",
        totalDebt: "9.6B",
        workingCapital: "8.2B"
      },
      ratios: {
        peRatio: "52.7",
        pegRatio: "2.8",
        priceToSales: "8.2",
        priceToBook: "18.7",
        debtToEquity: "0.23",
        currentRatio: "1.8",
        quickRatio: "1.2",
        returnOnEquity: "35.5%",
        returnOnAssets: "14.1%",
        grossMargin: "21.5%",
        operatingMargin: "9.2%",
        netMargin: "15.5%"
      },
      cashFlow: {
        operatingCashFlow: "28.4B",
        investingCashFlow: "-8.9B",
        financingCashFlow: "-2.1B",
        freeCashFlow: "7.6B",
        capex: "8.9B"
      }
    },
    historicalData: [
      { date: "2024-01", price: 193.57, volume: 45.2, high: 205.20, low: 185.40, ma5: 193.57, ma10: 193.57, ma200: 193.57 },
      { date: "2024-02", price: 201.29, volume: 52.8, high: 215.45, low: 190.20, ma5: 197.43, ma10: 197.43, ma200: 197.43 },
      { date: "2024-03", price: 175.43, volume: 67.3, high: 210.90, low: 165.45, ma5: 190.10, ma10: 190.10, ma200: 190.10 },
      { date: "2024-04", price: 194.05, volume: 48.7, high: 205.60, low: 175.80, ma5: 191.09, ma10: 191.09, ma200: 191.09 },
      { date: "2024-05", price: 177.48, volume: 89.4, high: 198.75, low: 160.90, ma5: 188.36, ma10: 188.36, ma200: 188.36 },
      { date: "2024-06", price: 194.70, volume: 76.2, high: 210.80, low: 175.30, ma5: 187.59, ma10: 187.59, ma200: 187.59 },
      { date: "2024-07", price: 254.20, volume: 95.8, high: 275.40, low: 220.15, ma5: 199.75, ma10: 199.75, ma200: 199.75 },
      { date: "2024-08", price: 248.23, volume: 89.0, high: 265.20, low: 230.10, ma5: 215.97, ma10: 215.97, ma200: 215.97 },
    ],
    news: [
      {
        title: "Tesla Reports Record Vehicle Deliveries in Q3",
        source: "Electrek",
        date: "2024-08-22",
        url: "https://electrek.co/tesla-deliveries-q3",
        summary: "Tesla delivered 466,140 vehicles globally, up 20% from last quarter."
      },
      {
        title: "Tesla's Full Self-Driving Beta Expands to More Cities",
        source: "Teslarati",
        date: "2024-08-19",
        url: "https://teslarati.com/fsd-beta-expansion",
        summary: "FSD Beta now available in 15 additional cities across North America."
      },
      {
        title: "Tesla Energy Storage Installations Hit New Record",
        source: "CleanTechnica",
        date: "2024-08-16",
        url: "https://cleantechnica.com/tesla-energy-storage",
        summary: "Megapack installations grow 150% year-over-year."
      }
    ]
  }
};

const CompanyProfile = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [zoomRange, setZoomRange] = useState<{ start: number; end: number } | null>(null);

  useEffect(() => {
    if (ticker && companyProfiles[ticker]) {
      setCompany(companyProfiles[ticker]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [ticker]);

  const handleUpgrade = () => {
    navigate('/subscribe');
  };

  // Get filtered data based on zoom range
  const getFilteredData = (data: any[]) => {
    if (!zoomRange) return data;
    return data.slice(zoomRange.start, zoomRange.end + 1);
  };

  const handleZoomIn = () => {
    if (!company?.historicalData) return;
    const dataLength = company.historicalData.length;
    if (!zoomRange) {
      setZoomRange({ start: Math.floor(dataLength * 0.2), end: Math.floor(dataLength * 0.8) });
    } else {
      const currentRange = zoomRange.end - zoomRange.start;
      const newRange = Math.max(2, Math.floor(currentRange * 0.7));
      const center = Math.floor((zoomRange.start + zoomRange.end) / 2);
      setZoomRange({
        start: Math.max(0, center - Math.floor(newRange / 2)),
        end: Math.min(dataLength - 1, center + Math.floor(newRange / 2))
      });
    }
  };

  const handleZoomOut = () => {
    if (!company?.historicalData) return;
    const dataLength = company.historicalData.length;
    if (!zoomRange) return;
    
    const currentRange = zoomRange.end - zoomRange.start;
    const newRange = Math.min(dataLength - 1, Math.floor(currentRange * 1.3));
    const center = Math.floor((zoomRange.start + zoomRange.end) / 2);
    setZoomRange({
      start: Math.max(0, center - Math.floor(newRange / 2)),
      end: Math.min(dataLength - 1, center + Math.floor(newRange / 2))
    });
  };

  const handleResetZoom = () => {
    setZoomRange(null);
  };

  const SubscriptionPrompt = ({ feature }: { feature: string }) => (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{feature} is a Pro Feature</CardTitle>
            <p className="text-muted-foreground">
              Unlock advanced analytics, detailed charts, and news insights with a Pro subscription.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Crown className="w-4 h-4" />
                <span>Pro features include:</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Moving Averages Analysis (MA 5, 10, 200)</li>
                <li>• Price Range Charts (High/Low/Close)</li>
                <li>• Real-time News & Market Insights</li>
                <li>• Advanced Technical Indicators</li>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Company Not Found</h1>
          <p className="text-muted-foreground mb-6">The company profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isPositive = company.change >= 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{company.ticker}</h1>
              <h2 className="text-2xl text-muted-foreground mb-4">{company.company}</h2>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline" className="text-sm">
                  {company.industry}
                </Badge>
                <Badge className={`${company.signal === 'invest' ? 'bg-invest/20 text-invest border-invest/50' : 
                  company.signal === 'watch' ? 'bg-watch/20 text-watch border-watch/50' : 
                  company.signal === 'hold' ? 'bg-hold/20 text-hold border-hold/50' : 
                  'bg-sell/20 text-sell border-sell/50'} font-semibold`}>
                  {company.signal.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold text-foreground mb-2">
                ${company.price.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-invest' : 'text-sell'}`}>
                {isPositive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="text-lg font-semibold">
                  {isPositive ? '+' : ''}{company.change.toFixed(2)}%
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Volume: {company.volume}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="chart">Price Chart</TabsTrigger>
            <TabsTrigger value="news">News & Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  AI Investment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={`text-lg px-4 py-2 ${
                    company.aiAnalysis.status === 'INVEST' ? 'bg-green-500/20 text-green-600 border-green-500/50' :
                    company.aiAnalysis.status === 'WATCH' ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50' :
                    company.aiAnalysis.status === 'HOLD' ? 'bg-blue-500/20 text-blue-600 border-blue-500/50' :
                    'bg-red-500/20 text-red-600 border-red-500/50'
                  }`}>
                    {company.aiAnalysis.status}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Confidence: {company.aiAnalysis.confidence}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Analysis Summary</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.aiAnalysis.reasoning}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Factors</h4>
                  <ul className="space-y-2">
                    {company.aiAnalysis.keyFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{company.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Business Model</h4>
                    <p className="text-sm text-muted-foreground">{company.businessModel}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded:</span>
                    <span className="font-semibold">{company.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Headquarters:</span>
                    <span className="font-semibold">{company.headquarters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CEO:</span>
                    <span className="font-semibold">{company.ceo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employees:</span>
                    <span className="font-semibold">{company.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap:</span>
                    <span className="font-semibold">${company.marketCap}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            {/* Income Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Income Statement (YoY Growth)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="text-2xl font-bold text-foreground">${company.financials.incomeStatement.revenue.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">vs ${company.financials.incomeStatement.revenue.previous}</span>
                      <Badge className={company.financials.incomeStatement.revenue.growth.startsWith('-') ? 'bg-red-500/20 text-red-600' : 'bg-green-500/20 text-green-600'}>
                        {company.financials.incomeStatement.revenue.growth}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Gross Profit</div>
                    <div className="text-2xl font-bold text-foreground">${company.financials.incomeStatement.grossProfit.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">vs ${company.financials.incomeStatement.grossProfit.previous}</span>
                      <Badge className={company.financials.incomeStatement.grossProfit.growth.startsWith('-') ? 'bg-red-500/20 text-red-600' : 'bg-green-500/20 text-green-600'}>
                        {company.financials.incomeStatement.grossProfit.growth}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Operating Income</div>
                    <div className="text-2xl font-bold text-foreground">${company.financials.incomeStatement.operatingIncome.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">vs ${company.financials.incomeStatement.operatingIncome.previous}</span>
                      <Badge className={company.financials.incomeStatement.operatingIncome.growth.startsWith('-') ? 'bg-red-500/20 text-red-600' : 'bg-green-500/20 text-green-600'}>
                        {company.financials.incomeStatement.operatingIncome.growth}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Net Income</div>
                    <div className="text-2xl font-bold text-foreground">${company.financials.incomeStatement.netIncome.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">vs ${company.financials.incomeStatement.netIncome.previous}</span>
                      <Badge className={company.financials.incomeStatement.netIncome.growth.startsWith('-') ? 'bg-red-500/20 text-red-600' : 'bg-green-500/20 text-green-600'}>
                        {company.financials.incomeStatement.netIncome.growth}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">EBITDA</div>
                    <div className="text-2xl font-bold text-foreground">${company.financials.incomeStatement.ebitda.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">vs ${company.financials.incomeStatement.ebitda.previous}</span>
                      <Badge className={company.financials.incomeStatement.ebitda.growth.startsWith('-') ? 'bg-red-500/20 text-red-600' : 'bg-green-500/20 text-green-600'}>
                        {company.financials.incomeStatement.ebitda.growth}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Balance Sheet */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Balance Sheet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Assets</span>
                      <span className="font-semibold">${company.financials.balanceSheet.totalAssets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Liabilities</span>
                      <span className="font-semibold">${company.financials.balanceSheet.totalLiabilities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Equity</span>
                      <span className="font-semibold">${company.financials.balanceSheet.totalEquity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cash & Equivalents</span>
                      <span className="font-semibold">${company.financials.balanceSheet.cashAndEquivalents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Debt</span>
                      <span className="font-semibold">${company.financials.balanceSheet.totalDebt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Working Capital</span>
                      <span className="font-semibold">${company.financials.balanceSheet.workingCapital}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cash Flow Statement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operating Cash Flow</span>
                      <span className="font-semibold text-green-600">${company.financials.cashFlow.operatingCashFlow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investing Cash Flow</span>
                      <span className={`font-semibold ${company.financials.cashFlow.investingCashFlow.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        ${company.financials.cashFlow.investingCashFlow}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Financing Cash Flow</span>
                      <span className={`font-semibold ${company.financials.cashFlow.financingCashFlow.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        ${company.financials.cashFlow.financingCashFlow}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Free Cash Flow</span>
                      <span className="font-semibold text-green-600">${company.financials.cashFlow.freeCashFlow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital Expenditures</span>
                      <span className="font-semibold text-red-600">${company.financials.cashFlow.capex}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Ratios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Financial Ratios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Valuation Ratios</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">P/E Ratio</span>
                        <span className="font-semibold">{company.financials.ratios.peRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">PEG Ratio</span>
                        <span className="font-semibold">{company.financials.ratios.pegRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price/Sales</span>
                        <span className="font-semibold">{company.financials.ratios.priceToSales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price/Book</span>
                        <span className="font-semibold">{company.financials.ratios.priceToBook}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Liquidity Ratios</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current Ratio</span>
                        <span className="font-semibold">{company.financials.ratios.currentRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quick Ratio</span>
                        <span className="font-semibold">{company.financials.ratios.quickRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Debt/Equity</span>
                        <span className="font-semibold">{company.financials.ratios.debtToEquity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Profitability Ratios</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ROE</span>
                        <span className="font-semibold">{company.financials.ratios.returnOnEquity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ROA</span>
                        <span className="font-semibold">{company.financials.ratios.returnOnAssets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Gross Margin</span>
                        <span className="font-semibold">{company.financials.ratios.grossMargin}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Operating Margins</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Operating Margin</span>
                        <span className="font-semibold">{company.financials.ratios.operatingMargin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Net Margin</span>
                        <span className="font-semibold">{company.financials.ratios.netMargin}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart" className="space-y-6">
            {!user?.isSubscribed ? (
              <SubscriptionPrompt feature="Advanced Charts" />
            ) : (
            <>
            {/* Zoom Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Chart Controls</h3>
                <Badge variant="outline" className="text-xs">
                  {zoomRange ? `Zoomed: ${zoomRange.start + 1}-${zoomRange.end + 1}` : 'Full View'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={!company?.historicalData}
                  className="gap-2"
                >
                  <ZoomIn className="w-4 h-4" />
                  Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={!zoomRange}
                  className="gap-2"
                >
                  <ZoomOut className="w-4 h-4" />
                  Zoom Out
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetZoom}
                  disabled={!zoomRange}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Price History (8 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={getFilteredData(company.historicalData)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#9CA3AF"
                          fontSize={12}
                          label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                        />
                        <YAxis 
                          yAxisId="price"
                          stroke="#9CA3AF"
                          fontSize={12}
                          label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                        />
                        <YAxis 
                          yAxisId="volume"
                          orientation="right"
                          stroke="#9CA3AF"
                          fontSize={12}
                          label={{ value: 'Volume (M)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                          formatter={(value: any, name: string) => {
                            if (name === 'price') return [`$${value.toFixed(2)}`, 'Price'];
                            if (name === 'volume') return [`${value}M`, 'Volume'];
                            if (name === 'ma5') return [`$${value.toFixed(2)}`, 'MA 5'];
                            if (name === 'ma10') return [`$${value.toFixed(2)}`, 'MA 10'];
                            if (name === 'ma200') return [`$${value.toFixed(2)}`, 'MA 200'];
                            return [value, name];
                          }}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Area 
                          yAxisId="price"
                          type="monotone" 
                          dataKey="price" 
                          stroke="#10B981" 
                          fill="#10B981" 
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Line 
                          yAxisId="price"
                          type="monotone" 
                          dataKey="ma5" 
                          stroke="#F59E0B" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                        <Line 
                          yAxisId="price"
                          type="monotone" 
                          dataKey="ma10" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          strokeDasharray="3 3"
                          dot={false}
                        />
                        <Line 
                          yAxisId="price"
                          type="monotone" 
                          dataKey="ma200" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          strokeDasharray="8 8"
                          dot={false}
                        />
                        <Bar 
                          yAxisId="volume"
                          dataKey="volume" 
                          fill="#6366F1" 
                          fillOpacity={0.3}
                          radius={[2, 2, 0, 0]}
                        />
                        <Legend 
                          wrapperStyle={{
                            color: '#F9FAFB',
                            fontSize: '12px',
                            paddingTop: '20px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Volume Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Trading Volume Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getFilteredData(company.historicalData)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#9CA3AF"
                          fontSize={12}
                          label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                        />
                        <YAxis 
                          stroke="#9CA3AF"
                          fontSize={12}
                          label={{ value: 'Volume (M Shares)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                          formatter={(value: any) => [`${value}M shares`, 'Volume']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Bar 
                          dataKey="volume" 
                          fill="#8B5CF6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Moving Averages Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Moving Averages Analysis (MA 5, 10, 200)
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getFilteredData(company.historicalData)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        fontSize={12}
                        label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={12}
                        label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'price') return [`$${value.toFixed(2)}`, 'Price'];
                          if (name === 'ma5') return [`$${value.toFixed(2)}`, 'MA 5'];
                          if (name === 'ma10') return [`$${value.toFixed(2)}`, 'MA 10'];
                          if (name === 'ma200') return [`$${value.toFixed(2)}`, 'MA 200'];
                          return [value, name];
                        }}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ma5" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ma10" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ma200" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        strokeDasharray="8 8"
                        dot={false}
                      />
                      <Legend 
                        wrapperStyle={{
                          color: '#F9FAFB',
                          fontSize: '12px',
                          paddingTop: '20px'
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Price Range Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Price Range (High/Low) Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={getFilteredData(company.historicalData)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        fontSize={12}
                        label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={12}
                        label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'high') return [`$${value.toFixed(2)}`, 'High'];
                          if (name === 'low') return [`$${value.toFixed(2)}`, 'Low'];
                          if (name === 'price') return [`$${value.toFixed(2)}`, 'Close'];
                          return [value, name];
                        }}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="high" 
                        stroke="#EF4444" 
                        fill="#EF4444" 
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="low" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            </>
            )}
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            {!user?.isSubscribed ? (
              <SubscriptionPrompt feature="News & Analysis" />
            ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  Latest News & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.news.map((article: any, index: number) => (
                  <div key={index} className="border-b border-border/50 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.date}
                          </span>
                          <span>{article.source}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Read
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyProfile;

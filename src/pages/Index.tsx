import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TopPicks } from "@/components/TopPicks";
import { Pricing } from "@/components/Pricing";
import { Disclaimer } from "@/components/Disclaimer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <TopPicks />
        <Pricing />
        <Disclaimer />
      </main>
    </div>
  );
};

export default Index;

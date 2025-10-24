import { AlertTriangle } from "lucide-react";

export const Disclaimer = () => {
  return (
    <section className="py-12 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-watch mt-1 flex-shrink-0" />
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                Important Legal Disclaimer
              </p>
              <p>
                Forge.AI is not a registered investment advisor. The information provided on this platform is for informational and educational purposes only and does not constitute financial advice, investment recommendations, or an offer to buy or sell securities.
              </p>
              <p>
                All users acknowledge they are making independent investment decisions. Past performance does not guarantee future results. Stock market investments carry inherent risks, including the potential loss of principal.
              </p>
              <p>
                Data and predictions provided by Forge.AI may not reflect actual market outcomes. Users should conduct their own research and consult with licensed financial professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

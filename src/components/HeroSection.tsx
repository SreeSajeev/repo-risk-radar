
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { HeroDashboardMockup } from "@/components/HeroDashboardMockup";

export const HeroSection = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Quantify Developer Risk. Predict Churn. Compare Repositories.";

  useEffect(() => {
    const words = fullText.split(" ");
    let currentWordIndex = 0;
    let currentText = "";

    const animateText = () => {
      if (currentWordIndex < words.length) {
        currentText += (currentWordIndex > 0 ? " " : "") + words[currentWordIndex];
        setAnimatedText(currentText);
        currentWordIndex++;
        setTimeout(animateText, 150);
      }
    };

    const timer = setTimeout(animateText, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
              <span className="bg-gradient-to-r from-[#EAEAEA] to-[#A2A2A2] bg-clip-text text-transparent">
                {animatedText}
              </span>
              <span className="animate-pulse">|</span>
            </h1>
            
            <p className="text-xl text-[#A2A2A2] leading-relaxed max-w-2xl">
              BusFactor uses commit patterns, contributor decay modeling, and churn forecasts 
              to help you measure how fragile or stable your codebase is.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#0061FF] to-[#4C9FFF] hover:from-[#4C9FFF] hover:to-[#0061FF] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0061FF]/20 group"
            >
              Analyze My Repository
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#8892B0] text-[#EAEAEA] hover:border-[#00FFD1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300"
            >
              See Live Dashboard
            </Button>
          </div>
        </div>

        {/* Right Content - Dashboard Mockup */}
        <div className="relative">
          <HeroDashboardMockup />
        </div>
      </div>
    </section>
  );
};

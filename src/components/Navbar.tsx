
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0E0E10]/90 backdrop-blur-lg border-b border-[#00FFD1]/20 py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0061FF] to-[#4C9FFF] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-mono font-semibold">BusFactor</span>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#dashboard" className="text-[#A2A2A2] hover:text-[#EAEAEA] transition-colors">
            Dashboard
          </a>
          <a href="#insights" className="text-[#A2A2A2] hover:text-[#EAEAEA] transition-colors">
            Repo Insights
          </a>
          <a href="#compare" className="text-[#A2A2A2] hover:text-[#EAEAEA] transition-colors">
            Compare Repos
          </a>
          <a href="#churn" className="text-[#A2A2A2] hover:text-[#EAEAEA] transition-colors">
            Churn Forecast
          </a>
          <a href="#docs" className="text-[#A2A2A2] hover:text-[#EAEAEA] transition-colors">
            Docs
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-[#8892B0] text-[#EAEAEA] hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all">
            Login
          </Button>
          <Button className="bg-gradient-to-r from-[#0061FF] to-[#4C9FFF] hover:from-[#4C9FFF] hover:to-[#0061FF] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0061FF]/20">
            Start Analysis
          </Button>
        </div>
      </div>
    </nav>
  );
};

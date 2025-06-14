
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass =
    "text-[#A2A2A2] hover:text-[#EAEAEA] transition-colors px-2 py-1 font-medium rounded" +
    " " +
    "hover:bg-[#4c9fff22] focus:outline-none focus-visible:ring-2";

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Repo Insights", path: "/repo-insights" },
    { name: "Compare Repos", path: "/compare-repos" },
    { name: "Churn Forecast", path: "/churn-forecast" },
    { name: "Docs", path: "/docs" },
  ];

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
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${linkClass} ${location.pathname === item.path ? "text-[#00FFD1]" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-[#8892B0] text-[#EAEAEA] hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all">
              Login
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-[#0061FF] to-[#4C9FFF] hover:from-[#4C9FFF] hover:to-[#0061FF] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0061FF]/20">
              Start Analysis
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

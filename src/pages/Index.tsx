
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { LiveDemoSection } from "@/components/LiveDemoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        backgroundRef.current.style.background = `
          radial-gradient(circle at ${x * 100}% ${y * 100}%, 
          rgba(0, 97, 255, 0.03) 0%, 
          transparent 50%)
        `;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA] relative overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 z-0 transition-all duration-300 ease-out"
      />
      
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(234, 234, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234, 234, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeatureGrid />
        <LiveDemoSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;


import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Scale, Users, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animation: React.ReactNode;
  index: number;
}

const FeatureCard = ({ icon, title, description, animation, index }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <Card 
      ref={cardRef}
      className={`bg-[#1A1A1C] border-[#8892B0]/20 hover:border-[#00FFD1]/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#0061FF]/10 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-[#0061FF]/20 to-[#4C9FFF]/20 rounded-lg group-hover:from-[#0061FF]/30 group-hover:to-[#4C9FFF]/30 transition-all">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-[#EAEAEA]">{title}</h3>
        </div>
        
        <p className="text-[#A2A2A2] leading-relaxed">{description}</p>
        
        <div className="mt-6">
          {animation}
        </div>
      </CardContent>
    </Card>
  );
};

const ChurnAnimation = () => {
  const [values, setValues] = useState([80, 75, 70, 65, 45, 20]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => prev.map(val => Math.max(10, val - Math.random() * 10)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-[#A2A2A2]">
        <span>Activity Level</span>
        <span>6 months</span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {values.map((height, i) => (
          <div
            key={i}
            className="bg-gradient-to-t from-red-500 to-yellow-500 rounded-t flex-1 transition-all duration-1000"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
};

const ComparisonAnimation = () => {
  const [scores] = useState([
    { name: "Repo A", score: 8, risk: "low" },
    { name: "Repo B", score: 3, risk: "high" },
    { name: "Repo C", score: 6, risk: "medium" }
  ]);

  return (
    <div className="space-y-3">
      {scores.map((repo, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm text-[#A2A2A2]">{repo.name}</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-[#8892B0]/20 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 delay-${i * 200} ${
                  repo.risk === 'low' ? 'bg-green-500' :
                  repo.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(repo.score / 10) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-[#EAEAEA] w-8">{repo.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const BusFactorAnimation = () => {
  const [score, setScore] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => prev === 8 ? 2 : prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="#8892B0"
            strokeWidth="8"
            fill="none"
            opacity="0.2"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke={score <= 3 ? "#ef4444" : score <= 6 ? "#eab308" : "#22c55e"}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(score / 10) * 251.2} 251.2`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#EAEAEA]">{score}</span>
        </div>
      </div>
    </div>
  );
};

const ActivityAnimation = () => {
  const [commits] = useState([
    { author: "dev1", commits: 45, color: "#0061FF" },
    { author: "dev2", commits: 30, color: "#4C9FFF" },
    { author: "dev3", commits: 15, color: "#00FFD1" },
    { author: "others", commits: 10, color: "#8892B0" }
  ]);

  return (
    <div className="space-y-2">
      {commits.map((dev, i) => (
        <div key={i} className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: dev.color }}
          />
          <span className="text-xs text-[#A2A2A2] flex-1">{dev.author}</span>
          <span className="text-xs text-[#EAEAEA]">{dev.commits}%</span>
        </div>
      ))}
    </div>
  );
};

export const FeatureGrid = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#EAEAEA] mb-4">
            What It Does
          </h2>
          <p className="text-xl text-[#A2A2A2] max-w-3xl mx-auto">
            Comprehensive developer intelligence to identify risks, predict churn, and compare repository health
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<TrendingDown className="h-6 w-6 text-[#0061FF]" />}
            title="Contributor Churn Prediction"
            description="Identify silent attrition early by analyzing activity drops and commit gaps."
            animation={<ChurnAnimation />}
            index={0}
          />

          <FeatureCard
            icon={<Scale className="h-6 w-6 text-[#4C9FFF]" />}
            title="Cross-Repository Comparison"
            description="Compare the stability and exposure of multiple repos visually."
            animation={<ComparisonAnimation />}
            index={1}
          />

          <FeatureCard
            icon={<Users className="h-6 w-6 text-[#00FFD1]" />}
            title="Bus Factor Score"
            description="Predict the number of people needed to maintain this codebase safely."
            animation={<BusFactorAnimation />}
            index={2}
          />

          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-[#8892B0]" />}
            title="Contributor Analysis"
            description="Visualize contributor dominance and identify single points of failure."
            animation={<ActivityAnimation />}
            index={3}
          />
        </div>
      </div>
    </section>
  );
};

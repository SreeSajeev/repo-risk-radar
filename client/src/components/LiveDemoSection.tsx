
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Clock, TrendingDown, Users, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export const LiveDemoSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState({
    commits: 0,
    contributors: 0,
    risk: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => ({
        commits: prev.commits >= 1247 ? 856 : prev.commits + 23,
        contributors: prev.contributors >= 12 ? 3 : prev.contributors + 1,
        risk: prev.risk >= 8.2 ? 2.1 : prev.risk + 0.3
      }));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const demoCards = [
    {
      id: "overview",
      title: "Repository Overview",
      icon: <GitBranch className="h-5 w-5 text-[#0061FF]" />,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#A2A2A2]">Total Commits</span>
            <span className="text-[#EAEAEA] font-semibold">{animatedValues.commits.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#A2A2A2]">Active Contributors</span>
            <span className="text-[#EAEAEA] font-semibold">{animatedValues.contributors}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#A2A2A2]">Bus Factor Score</span>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              {animatedValues.risk.toFixed(1)}
            </Badge>
          </div>
        </div>
      ),
      tooltip: "Real-time analysis of repository health metrics"
    },
    {
      id: "contributors",
      title: "Top Contributors",
      icon: <Users className="h-5 w-5 text-[#4C9FFF]" />,
      content: (
        <div className="space-y-3">
          {[
            { name: "alice_dev", commits: 34, risk: "high" },
            { name: "bob_senior", commits: 28, risk: "high" },
            { name: "charlie_js", commits: 22, risk: "medium" },
            { name: "diana_ui", commits: 16, risk: "low" }
          ].map((dev, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  dev.risk === 'high' ? 'bg-red-400' :
                  dev.risk === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <span className="text-[#EAEAEA] text-sm">{dev.name}</span>
              </div>
              <span className="text-[#A2A2A2] text-sm">{dev.commits}%</span>
            </div>
          ))}
        </div>
      ),
      tooltip: "5 contributors own 84% of the code"
    },
    {
      id: "timeline",
      title: "Activity Timeline",
      icon: <Clock className="h-5 w-5 text-[#00FFD1]" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-end gap-1 h-12">
            {[65, 72, 58, 45, 23, 12].map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-[#0061FF] to-[#4C9FFF] rounded-t flex-1 transition-all duration-1000"
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#A2A2A2]">
            <span>6mo</span>
            <span>Now</span>
          </div>
        </div>
      ),
      tooltip: "Declining activity over the last 6 months"
    },
    {
      id: "alerts",
      title: "Risk Alerts",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded">
            <TrendingDown className="h-4 w-4 text-red-400 mt-0.5" />
            <div>
              <p className="text-red-400 text-sm font-medium">High Risk</p>
              <p className="text-[#A2A2A2] text-xs">2 key contributors inactive 90+ days</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
            <Users className="h-4 w-4 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-yellow-400 text-sm font-medium">Knowledge Risk</p>
              <p className="text-[#A2A2A2] text-xs">Single expert owns 67% of critical files</p>
            </div>
          </div>
        </div>
      ),
      tooltip: "Active monitoring of project sustainability risks"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[#0E0E10]/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#EAEAEA] mb-4">
            Live Demo Dashboard
          </h2>
          <p className="text-xl text-[#A2A2A2] max-w-3xl mx-auto">
            Interactive analysis showing real patterns from open-source repositories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoCards.map((card, index) => (
            <Card
              key={card.id}
              className={`bg-[#1A1A1C] border-[#8892B0]/20 transition-all duration-300 cursor-pointer transform ${
                hoveredCard === card.id 
                  ? 'border-[#00FFD1]/60 scale-105 shadow-lg shadow-[#00FFD1]/10' 
                  : 'hover:border-[#00FFD1]/40 hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-[#EAEAEA] text-lg flex items-center gap-2">
                  {card.icon}
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {card.content}
                
                {hoveredCard === card.id && (
                  <div className="mt-4 p-3 bg-[#0061FF]/10 border border-[#0061FF]/20 rounded-lg">
                    <p className="text-xs text-[#00FFD1]">{card.tooltip}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#A2A2A2] mb-6">
            See how BusFactor identifies risks before they become critical
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1C] border border-[#8892B0]/20 rounded-lg">
            <div className="w-2 h-2 bg-[#00FFD1] rounded-full animate-pulse" />
            <span className="text-sm text-[#EAEAEA]">Live data simulation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

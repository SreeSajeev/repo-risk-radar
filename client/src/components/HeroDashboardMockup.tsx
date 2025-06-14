
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, GitBranch, Users, AlertTriangle } from "lucide-react";

export const HeroDashboardMockup = () => {
  const [riskScore, setRiskScore] = useState(2);
  const [activeContributors, setActiveContributors] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => prev === 8 ? 2 : prev + 1);
      setActiveContributors(prev => prev === 12 ? 3 : prev + 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0061FF]/20 to-[#4C9FFF]/20 blur-xl rounded-2xl"></div>
      
      <Card className="relative bg-[#1A1A1C] border-[#8892B0]/20 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-[#EAEAEA] flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-[#0061FF]" />
            Repository Risk Analysis
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Risk Score */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#A2A2A2] text-sm">Bus Factor Score</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-[#EAEAEA]">{riskScore}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  riskScore <= 3 ? 'bg-red-500/20 text-red-400' :
                  riskScore <= 6 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {riskScore <= 3 ? 'High Risk' : riskScore <= 6 ? 'Medium Risk' : 'Low Risk'}
                </span>
              </div>
            </div>
            <AlertTriangle className={`h-8 w-8 ${
              riskScore <= 3 ? 'text-red-400' :
              riskScore <= 6 ? 'text-yellow-400' :
              'text-green-400'
            }`} />
          </div>

          {/* Active Contributors */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#A2A2A2] text-sm">Active Contributors</p>
              <span className="text-2xl font-semibold text-[#EAEAEA]">{activeContributors}</span>
            </div>
            <Users className="h-6 w-6 text-[#00FFD1]" />
          </div>

          {/* Contributor Activity Chart */}
          <div className="space-y-2">
            <p className="text-[#A2A2A2] text-sm">Contributor Activity (Last 6 months)</p>
            <div className="flex items-end gap-1 h-16">
              {[8, 12, 15, 18, 14, 9].map((height, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-[#0061FF] to-[#4C9FFF] rounded-t flex-1 transition-all duration-1000 ease-out"
                  style={{ 
                    height: `${(height / 20) * 100}%`,
                    animationDelay: `${i * 200}ms`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Churn Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center gap-3">
            <TrendingDown className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-yellow-400 text-sm font-medium">Churn Alert</p>
              <p className="text-[#A2A2A2] text-xs">2 key contributors inactive for 3+ months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart, TriangleAlert } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA]">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-32 px-6 pb-8 space-y-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">busfactor/busfactor-analyzer</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-600/10 text-green-400 font-mono text-xs ring-1 ring-green-600/30">
              <BarChart className="w-4 h-4 mr-1" /> Analyzing
            </span>
          </div>
          <div className="text-[#A2A2A2] text-sm">Last updated: 3 minutes ago</div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bus Factor Score */}
          <Card className="bg-[#17171C] border-[#00FFD1]/40 shadow-lg shadow-[#0061FF33] hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TriangleAlert className="w-5 h-5 text-yellow-400" /> Bus Factor Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-bold text-yellow-400 font-mono">3</span>
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono text-xs">High Risk</span>
              </div>
            </CardContent>
          </Card>
          {/* % Code Top Contributor */}
          <Card className="bg-[#17171C] border-[#00FFD1]/40 shadow-lg shadow-[#0061FF33] hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-blue-400" /> Top Contributor %
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-bold text-blue-400 font-mono">78%</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono text-xs">Ownership</span>
              </div>
            </CardContent>
          </Card>
          {/* Total Contributors */}
          <Card className="bg-[#17171C] border-[#00FFD1]/40 shadow-lg shadow-[#0061FF33] hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00FFD1]" /> Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-bold text-[#00FFD1] font-mono">12</span>
                <span className="px-2 py-0.5 rounded bg-[#00FFD1]/10 text-[#00FFD1] font-mono text-xs">Last 90d</span>
              </div>
            </CardContent>
          </Card>
          {/* Churn Risk */}
          <Card className="bg-[#17171C] border-[#00FFD1]/40 shadow-lg shadow-[#0061FF33] hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TriangleAlert className="w-5 h-5 text-red-400" /> Churn Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-semibold text-red-400 font-mono">2 contributors dropped</span>
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono text-xs">Action Needed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contributor Activity Timeline */}
          <Card className="bg-[#181B22] border-[#00FFD1]/20 shadow-lg shadow-[#0061FF11] hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle>Contributor Activity (6mo)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mini blue bar chart (placeholder) */}
              <div className="flex items-end gap-1 h-28">
                {[8, 12, 17, 18, 10, 6].map((h, i) => (
                  <div key={i}
                    className="bg-gradient-to-t from-[#0061FF] to-[#4C9FFF] rounded-t flex-1 transition-all duration-700"
                    style={{ height: `${(h / 20) * 100}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Ownership Pie Chart (placeholder) */}
          <Card className="bg-[#181B22] border-[#00FFD1]/20 shadow-lg shadow-[#0061FF11] hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle>Ownership Share</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Pie chart mockup */}
              <div className="flex justify-center items-center h-28">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <circle className="text-[#17171C]" strokeWidth="3" stroke="currentColor" fill="transparent" r="16" cx="18" cy="18"/>
                    <circle className="text-blue-400" strokeWidth="3" strokeDasharray="115, 100" strokeLinecap="round" fill="transparent" r="16" cx="18" cy="18"
                      style={{ strokeDashoffset: '0' }} />
                    <circle className="text-yellow-400" strokeWidth="3" strokeDasharray="30, 100" strokeLinecap="round" fill="transparent" r="16" cx="18" cy="18"
                      style={{ strokeDashoffset: '-115' }} />
                    <circle className="text-[#00FFD1]" strokeWidth="3" strokeDasharray="15, 100" strokeLinecap="round" fill="transparent" r="16" cx="18" cy="18"
                      style={{ strokeDashoffset: '-145' }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400 font-mono">78%</span>
                    <span className="text-xs text-[#A2A2A2]">Top Contributor</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <div className="mt-8">
          <Card className="bg-[#121217] border-[#00FFD1]/10 shadow-inner shadow-[#0061FF22]">
            <CardContent>
              <span className="text-lg">💡 <span className="font-semibold text-[#00FFD1]">Insight:</span> 2 contributors do 80% of work. <span className="text-yellow-400">Consider knowledge-sharing.</span></span>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ArrowDown } from "lucide-react";

const contributors = [
  { name: "Alice", commits: 200, percent: "60%", last: "2d ago", inactive: false },
  { name: "Bob", commits: 95, percent: "29%", last: "17d ago", inactive: false },
  { name: "Eve", commits: 20, percent: "6%", last: "70d ago", inactive: true },
  { name: "Dan", commits: 12, percent: "3%", last: "140d ago", inactive: true }
];

export default function RepoInsights() {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA]">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-32 px-6 pb-10">
        {/* Dropdown selector */}
        <div className="mb-8 flex items-center gap-4">
          <label className="text-lg font-semibold text-[#EAEAEA]" htmlFor="repo-select">Repository:</label>
          <select
            id="repo-select"
            className="bg-[#181B22] border border-[#8892B0]/30 rounded px-3 py-2 text-[#EAEAEA] font-mono"
          >
            <option>busfactor/busfactor-analyzer</option>
            <option>busfactor/another-project</option>
          </select>
        </div>
        {/* Table and Heatmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contributor Table */}
          <Card className="bg-[#17171C] border-[#00FFD1]/30 shadow-md shadow-[#0061FF18] text-[#EAEAEA]">
            <CardHeader>
              <CardTitle className="text-[#EAEAEA]">Contributors</CardTitle>
            </CardHeader>
            <CardContent className="text-[#EAEAEA]">
              <div className="overflow-auto">
                <table className="min-w-full text-left border-collapse font-mono">
                  <thead>
                    <tr className="text-[#A2A2A2] text-xs border-b border-[#00FFD1]/10">
                      <th className="py-2">Contributor</th>
                      <th className="py-2">Commits</th>
                      <th className="py-2">% Ownership</th>
                      <th className="py-2">Last Commit</th>
                      <th className="py-2">Inactive?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributors.map((c) => (
                      <tr key={c.name} className="hover:bg-[#21212c] transition-colors">
                        <td className="py-2">{c.name}</td>
                        <td className="py-2">{c.commits}</td>
                        <td className="py-2">{c.percent}</td>
                        <td className="py-2">{c.last}</td>
                        <td className="py-2">
                          {c.inactive ? (
                            <span className="inline-flex px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded text-xs font-mono">Yes</span>
                          ) : (
                            <span className="inline-flex px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs font-mono">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          {/* Heatmap Chart */}
          <Card className="bg-[#17171C] border-[#00FFD1]/20 shadow-lg shadow-[#0061FF22] text-[#EAEAEA]">
            <CardHeader>
              <CardTitle className="text-[#EAEAEA]">Commit Activity Heatmap</CardTitle>
            </CardHeader>
            <CardContent className="text-[#EAEAEA]">
              {/* Heatmap mockup */}
              <div className="grid grid-cols-7 gap-1">
                {[...Array(7 * 8)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded ${
                    i % 8 === 0
                      ? "bg-[#00FFD1]/40"
                      : i % 5 === 0
                      ? "bg-blue-500/50"
                      : "bg-[#A2A2A2]/10"
                  }`} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Callouts & Recommendations */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Risk Alerts Box */}
          <Card className="bg-red-600/10 border-red-700/40 backdrop-blur shadow-md shadow-red-400/20 text-[#EAEAEA]">
            <CardContent className="text-[#EAEAEA]">
              <span className="flex items-center gap-2 text-red-400 font-bold text-lg">
                <ArrowDown className="w-5 h-5" /> Single point of failure risk detected!
              </span>
              <div className="text-[#EAEAEA] text-sm mt-2">More than 70% of code is owned by one contributor.</div>
            </CardContent>
          </Card>
          {/* Recommendations Panel */}
          <Card className="bg-[#121217] border-[#00FFD1]/10 backdrop-blur shadow-inner shadow-[#0061FF19] text-[#EAEAEA]">
            <CardContent className="text-[#EAEAEA]">
              <div className="font-semibold text-blue-400 text-lg mb-1">Recommendation</div>
              <div className="text-[#EAEAEA] text-sm">
                Consider mentoring new contributors, and refactor critical modules to enable easy onboarding. Encourage code reviews and collaborative PRs.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const repos = [
  { name: "busfactor/busfactor-analyzer", bus: 3, contributors: 12, churn: 2, last: "3d ago", risk: "high", spark: [7,8,6,5,6,8] },
  { name: "busfactor/otherlib", bus: 6, contributors: 16, churn: 0, last: "1d ago", risk: "low", spark: [3,4,5,4,3,3] },
  { name: "busfactor/demo", bus: 2, contributors: 8, churn: 3, last: "36d ago", risk: "high", spark: [6,2,1,2,3,1] }
];

const riskColor = {
  high: "bg-red-500/10 text-red-400",
  low: "bg-green-500/10 text-green-400"
};

export default function CompareRepos() {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA]">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-32 px-6 pb-12">
        <h1 className="text-2xl font-semibold mb-6 text-[#EAEAEA]">Compare Repositories</h1>
        {/* Input Field */}
        <Card className="bg-[#181B22] border-[#00FFD1]/20 mb-6 shadow-lg shadow-[#0061FF11] text-[#EAEAEA]">
          <CardContent className="text-[#EAEAEA]">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Add GitHub repo URLs (comma separated)…"
                className="flex-1 bg-[#121217] border border-[#8892B0]/30 rounded px-3 py-2 text-[#EAEAEA] font-mono focus:ring-2 focus:ring-[#00FFD1]"
              />
              <button className="bg-gradient-to-r from-[#0061FF] to-[#4C9FFF] hover:from-[#4C9FFF] hover:to-[#0061FF] text-white font-medium px-5 py-2 rounded transition-all duration-300 hover:scale-105 shadow hover:shadow-[#0061FF]/20">
                Analyze
              </button>
            </div>
          </CardContent>
        </Card>
        {/* Comparison Table */}
        <div className="overflow-auto border rounded-lg border-[#00FFD1]/15 shadow-lg shadow-[#0061FF05]">
          <table className="min-w-full font-mono text-sm">
            <thead>
              <tr className="text-[#A2A2A2] bg-[#181B22]">
                <th className="p-3 text-left">Repo</th>
                <th className="p-3">Bus Factor</th>
                <th className="p-3">Contributors</th>
                <th className="p-3">Churned</th>
                <th className="p-3">Last Commit</th>
                <th className="p-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((r) => (
                <tr key={r.name} className={`hover:bg-[#21212c] transition-all ${r.risk === "high" ? "bg-red-600/10" : "bg-green-700/5"} text-[#EAEAEA]`}>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3"><span className={`inline-block px-2 py-0.5 rounded ${riskColor[r.risk]}`}>{r.bus}</span></td>
                  <td className="p-3">{r.contributors}</td>
                  <td className="p-3">{r.churn}</td>
                  <td className="p-3">{r.last}</td>
                  <td className="p-3">
                    {/* Mini Bar (Sparkline) */}
                    <div className="flex items-end h-6 gap-0.5">
                      {r.spark.map((v,i) => (
                        <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-[#0061FF] to-[#4C9FFF]" style={{height: `${v*10}%`}} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Decision Card */}
        <div className="mt-10 max-w-xl">
          <Card className="bg-gradient-to-br from-[#17171C] to-[#181B22] border-[#00FFD1]/20 shadow-lg shadow-[#0061FF22] hover:scale-105 transition-transform duration-300 text-[#EAEAEA]">
            <CardContent className="text-[#EAEAEA]">
              <span className="font-semibold text-xl text-green-400">busfactor/otherlib</span> is safer to fork than <span className="text-red-400">busfactor/demo</span> based on bus factor, current activity, and churn risk scores.
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

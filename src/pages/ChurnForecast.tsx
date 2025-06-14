
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

const contributors = [
  { handle: "alice", active: true, drop: "–" },
  { handle: "bob", active: false, drop: "Inactive 2mo" },
  { handle: "dan", active: false, drop: "Inactive 6mo" }
];

export default function ChurnForecast() {
  const [search, setSearch] = useState('');
  const filtered = contributors.filter(c => c.handle.includes(search));

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA]">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-32 px-6 pb-10 space-y-8">
        <h1 className="text-2xl font-semibold mb-3">Churn Forecast</h1>
        {/* Search Bar */}
        <div>
          <input
            type="text"
            className="bg-[#181B22] border rounded px-3 py-2 text-[#EAEAEA] font-mono w-full focus:border-[#00FFD1]"
            placeholder="Search contributors by handle"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Forecast Chart */}
        <Card className="bg-[#181B22] border-[#00FFD1]/20 shadow-lg shadow-[#0061FF18]">
          <CardHeader>
            <CardTitle>Churn Decay Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder chart */}
            <div className="flex items-end gap-1 h-24">
              {[18,15,14,10, 8, 5].map((val, i) => (
                <div key={i} className="w-5 rounded bg-gradient-to-t from-[#0061FF] to-[#4C9FFF]" style={{ height: `${(val / 20) * 100}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Timeline */}
        <Card className="bg-[#17171C] border-[#00FFD1]/20 shadow-inner">
          <CardHeader>
            <CardTitle>Contributor Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {filtered.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-mono">{c.handle}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${c.active ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {c.active ? "Active" : c.drop}
                  </span>
                  <button className="ml-auto px-3 py-1 bg-[#0E0E10]/70 border border-[#00FFD1]/30 rounded text-xs font-mono text-[#00FFD1] hover:bg-[#181B22] transition-all">View History</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Tips Box */}
        <Card className="bg-blue-500/10 border-blue-400/40 backdrop-blur shadow-md shadow-blue-400/20">
          <CardContent>
            <div className="text-blue-400 font-bold mb-2">Tip:</div>
            <div className="text-[#EAEAEA] text-sm">Increase PR reviews and distribute code ownership. Encourage mentorship and documentation!</div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

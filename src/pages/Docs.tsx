
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

const nav = [
  { name: "Overview" },
  { name: "Bus Factor Math" },
  { name: "Churn Detection" },
  { name: "GitHub API Usage" },
  { name: "FAQ" },
];

const content = {
  "Overview": [
    {
      type: "info",
      text: "BusFactor analyzes contributor activity to evaluate project sustainability and risk."
    },
    {
      type: "markdown",
      text: "To get started, use 'Dashboard' to analyze a repo, or see risk details in 'Repo Insights'."
    }
  ],
  "Bus Factor Math": [
    {
      type: "tip",
      text: "Bus factor is the minimum number of contributors whose loss would endanger project continuity."
    },
    {
      type: "code",
      text: `busFactor = count(contributors covering >= 70% of total commits)`
    }
  ],
  "Churn Detection": [
    {
      type: "warning",
      text: "Watch for a decline in key contributors' activity over time – this signals rising churn risk!"
    },
    {
      type: "markdown",
      text: "Churn detection uses commit activity timeline and inactivity flags."
    }
  ],
  "GitHub API Usage": [
    {
      type: "info",
      text: "All analysis uses only public GitHub API endpoints. Rate limited, so caching is recommended."
    },
    {
      type: "code",
      text: `fetch('https://api.github.com/repos/org/repo/commits?per_page=100&page=1', { headers: { 'Accept': 'application/vnd.github.v3+json' } })`
    }
  ],
  "FAQ": [
    {
      type: "info",
      text: "For more info, see docs or contact the developers."
    }
  ]
};

function SectionBlock({ block }: { block: any }) {
  if (block.type === "info") {
    return <div className="bg-[#A2A2A2]/10 border-l-4 border-[#A2A2A2]/40 px-4 py-2 rounded mb-3 text-[#A2A2A2] text-sm">{block.text}</div>;
  }
  if (block.type === "tip") {
    return <div className="bg-blue-500/10 border-l-4 border-blue-400/40 px-4 py-2 rounded mb-3 text-blue-300 text-sm">{block.text}</div>;
  }
  if (block.type === "warning") {
    return <div className="bg-red-500/10 border-l-4 border-red-400/40 px-4 py-2 rounded mb-3 text-red-400 text-sm">{block.text}</div>;
  }
  if (block.type === "code") {
    return (
      <pre className="bg-[#121217] rounded px-4 py-2 font-mono text-[#EAEAEA] text-sm my-3 overflow-x-auto">
        <code>{block.text}</code>
      </pre>
    );
  }
  // markdown fallback
  return <div className="text-[#EAEAEA] mb-4">{block.text}</div>;
}

export default function Docs() {
  const [section, setSection] = useState(nav[0].name);

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA]">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-32 pb-8 flex">
        {/* Sidebar nav */}
        <aside className="w-56 flex-shrink-0 mr-10">
          <nav className="flex flex-col gap-1">
            {nav.map((s) => (
              <button
                key={s.name}
                className={`text-left px-4 py-2 rounded font-semibold ${
                  section === s.name
                    ? "bg-gradient-to-r from-[#0061FF] to-[#00FFD1]/80 text-white"
                    : "bg-[#17171C] text-[#A2A2A2] hover:text-[#EAEAEA]"
                } transition-all`}
                onClick={() => setSection(s.name)}
              >
                {s.name}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main section */}
        <section className="flex-1">
          <Card className="bg-[#181B22] border-[#00FFD1]/20 shadow-lg shadow-[#0061FF11] text-[#EAEAEA]">
            <CardHeader>
              <CardTitle className="text-[#EAEAEA]">{section}</CardTitle>
            </CardHeader>
            <CardContent className="text-[#EAEAEA]">
              {content[section].map((block, i) => (
                <SectionBlock key={i} block={block} />
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}

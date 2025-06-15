import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { githubAPI, type BusFactorResponse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GitBranch, Users, AlertTriangle } from "lucide-react";

export function AnalyzeRepoForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BusFactorResponse | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a repository URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await githubAPI.analyzeBusFactor(repoUrl);
      setResult(response);
      toast({
        title: "Analysis Complete",
        description: `Bus factor calculated for ${response.repo}`,
      });
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.response?.data?.error || "Failed to analyze repository",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#181B22] border-[#00FFD1]/20">
        <CardHeader>
          <CardTitle className="text-[#EAEAEA] flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Analyze Repository
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter GitHub repository URL (e.g., https://github.com/facebook/react)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-[#121217] border-[#8892B0]/30 text-[#EAEAEA]"
            />
            <Button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-gradient-to-r from-[#0061FF] to-[#4C9FFF] hover:from-[#4C9FFF] hover:to-[#0061FF]"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-[#17171C] border-[#00FFD1]/30">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Analysis Results for {result.repo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 font-mono">
                  {result.busFactor}
                </div>
                <div className="text-sm text-[#A2A2A2]">Bus Factor</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00FFD1] font-mono">
                  {result.totalCommits}
                </div>
                <div className="text-sm text-[#A2A2A2]">Total Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 font-mono">
                  {result.topContributors.length}
                </div>
                <div className="text-sm text-[#A2A2A2]">Contributors</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-[#EAEAEA] mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Top Contributors
              </h4>
              <div className="space-y-2">
                {result.topContributors.map((contributor, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-[#181B22] rounded">
                    <span className="font-mono text-[#EAEAEA]">{contributor.name}</span>
                    <span className="text-[#00FFD1] font-mono">{contributor.commits} commits</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
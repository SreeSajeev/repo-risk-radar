import axios from 'axios';

interface GitHubCommit {
  author?: {
    login?: string;
  };
  commit: {
    author: {
      name: string;
      date: string;
    };
  };
}

interface Contributor {
  name: string;
  commits: number;
}

interface BusFactorAnalysis {
  busFactor: number;
  totalCommits: number;
  topContributors: Contributor[];
  contributorMap: Contributor[];
}

interface ChurnData {
  [contributor: string]: {
    [monthKey: string]: number;
  };
}

class GitHubAPI {
  private baseURL = 'https://api.github.com';
  private headers: Record<string, string>;

  constructor() {
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'BusFactor-Analyzer'
    };
    
    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      this.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
  }

  /**
   * Extract owner and repo from GitHub URL
   */
  parseRepoURL(repoURL: string): { owner: string; repo: string } {
    const match = repoURL.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    return {
      owner: match[1],
      repo: match[2].replace('.git', '')
    };
  }

  /**
   * Fetch all commits for a repository with pagination
   */
  async fetchCommitData(owner: string, repo: string): Promise<GitHubCommit[]> {
    const commits: GitHubCommit[] = [];
    let page = 1;
    const perPage = 100;
    const maxPages = 10; // Limit to 1000 commits for faster analysis
    
    try {
      while (page <= maxPages) {
        const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/commits`, {
          headers: this.headers,
          params: {
            per_page: perPage,
            page: page
          },
          timeout: 10000 // 10 second timeout per request
        });

        if (response.data.length === 0) break;
        
        commits.push(...response.data);
        
        // Break if we got less than a full page
        if (response.data.length < perPage) break;
        
        page++;
      }
      
      return commits;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Repository not found or private');
      }
      if (error.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded or access denied');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - repository analysis taking too long');
      }
      throw new Error(`GitHub API error: ${error.message}`);
    }
  }

  /**
   * Calculate bus factor from commit data
   */
  calculateBusFactor(commits: GitHubCommit[]): BusFactorAnalysis {
    const contributorMap = new Map<string, number>();
    
    // Count commits per contributor
    commits.forEach(commit => {
      const author = commit.author?.login || commit.commit?.author?.name || 'Unknown';
      contributorMap.set(author, (contributorMap.get(author) || 0) + 1);
    });

    // Sort contributors by commit count
    const sortedContributors: Contributor[] = Array.from(contributorMap.entries())
      .map(([name, commits]) => ({ name, commits }))
      .sort((a, b) => b.commits - a.commits);

    const totalCommits = commits.length;
    const threshold = totalCommits * 0.7; // 70% threshold
    
    let cumulativeCommits = 0;
    let busFactor = 0;
    
    for (const contributor of sortedContributors) {
      cumulativeCommits += contributor.commits;
      busFactor++;
      
      if (cumulativeCommits >= threshold) {
        break;
      }
    }

    return {
      busFactor,
      totalCommits,
      topContributors: sortedContributors.slice(0, 10), // Top 10 contributors
      contributorMap: sortedContributors
    };
  }

  /**
   * Get contributor churn data (commits over time)
   */
  getContributorChurn(commits: GitHubCommit[]): ChurnData {
    const churnData: ChurnData = {};
    
    commits.forEach(commit => {
      const author = commit.author?.login || commit.commit?.author?.name || 'Unknown';
      const date = new Date(commit.commit.author.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!churnData[author]) {
        churnData[author] = {};
      }
      
      churnData[author][monthKey] = (churnData[author][monthKey] || 0) + 1;
    });

    return churnData;
  }

  /**
   * Compare multiple repositories
   */
  async compareRepositories(repoURLs: string[]) {
    const comparisons = [];
    
    for (const repoURL of repoURLs) {
      try {
        const { owner, repo } = this.parseRepoURL(repoURL);
        const commits = await this.fetchCommitData(owner, repo);
        const analysis = this.calculateBusFactor(commits);
        
        comparisons.push({
          repo: `${owner}/${repo}`,
          busFactor: analysis.busFactor,
          topContributor: analysis.topContributors[0]?.name || 'Unknown',
          totalCommits: analysis.totalCommits
        });
      } catch (error: any) {
        comparisons.push({
          repo: repoURL,
          error: error.message
        });
      }
    }
    
    return comparisons;
  }

  /**
   * Analyze single repository for bus factor
   */
  async analyzeBusFactor(repoURL: string) {
    const { owner, repo } = this.parseRepoURL(repoURL);
    const commits = await this.fetchCommitData(owner, repo);
    const analysis = this.calculateBusFactor(commits);
    
    return {
      repo: `${owner}/${repo}`,
      totalCommits: analysis.totalCommits,
      busFactor: analysis.busFactor,
      topContributors: analysis.topContributors.slice(0, 5) // Top 5 for response
    };
  }

  /**
   * Analyze repository for churn prediction
   */
  async analyzeChurn(repoURL: string) {
    const { owner, repo } = this.parseRepoURL(repoURL);
    const commits = await this.fetchCommitData(owner, repo);
    const churnData = this.getContributorChurn(commits);
    
    return {
      repo: `${owner}/${repo}`,
      churnData
    };
  }
}

export default GitHubAPI;
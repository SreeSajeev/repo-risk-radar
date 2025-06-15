import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

export interface BusFactorResponse {
  repo: string;
  totalCommits: number;
  busFactor: number;
  topContributors: Array<{
    name: string;
    commits: number;
  }>;
}

export interface ChurnResponse {
  repo: string;
  churnData: {
    [contributor: string]: {
      [monthKey: string]: number;
    };
  };
}

export interface CompareResponse {
  repo: string;
  busFactor: number;
  topContributor: string;
  totalCommits: number;
  error?: string;
}

class GitHubAnalyticsAPI {
  private baseURL = `${API_BASE_URL}/api`;

  async analyzeBusFactor(repoURL: string): Promise<BusFactorResponse> {
    console.log('Making request to:', `${this.baseURL}/bus-factor`);
    console.log('Request payload:', { repo: repoURL });
    
    try {
      const response = await axios.post(`${this.baseURL}/bus-factor`, {
        repo: repoURL
      }, {
        timeout: 30000 // 30 second timeout
      });
      console.log('Response received:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }

  async analyzeChurn(repoURL: string): Promise<ChurnResponse> {
    const response = await axios.post(`${this.baseURL}/churn`, {
      repo: repoURL
    });
    return response.data;
  }

  async compareRepositories(repoURLs: string[]): Promise<CompareResponse[]> {
    const response = await axios.post(`${this.baseURL}/compare`, {
      repos: repoURLs
    });
    return response.data;
  }

  async healthCheck(): Promise<{ status: string }> {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  }
}

export const githubAPI = new GitHubAnalyticsAPI();
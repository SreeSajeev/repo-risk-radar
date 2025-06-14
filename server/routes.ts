import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import GitHubAPI from "./utils/githubUtils";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS for all routes
  app.use(cors());
  
  const githubAPI = new GitHubAPI();

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ status: "OK" });
  });

  // Bus Factor Analysis endpoint
  app.post("/api/bus-factor", async (req, res) => {
    try {
      const { repo } = req.body;
      
      if (!repo) {
        return res.status(400).json({ error: "Repository URL is required" });
      }

      const result = await githubAPI.analyzeBusFactor(repo);
      res.json(result);
    } catch (error: any) {
      console.error("Bus factor analysis error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Churn Analysis endpoint
  app.post("/api/churn", async (req, res) => {
    try {
      const { repo } = req.body;
      
      if (!repo) {
        return res.status(400).json({ error: "Repository URL is required" });
      }

      const result = await githubAPI.analyzeChurn(repo);
      res.json(result);
    } catch (error: any) {
      console.error("Churn analysis error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Repository Comparison endpoint
  app.post("/api/compare", async (req, res) => {
    try {
      const { repos } = req.body;
      
      if (!repos || !Array.isArray(repos) || repos.length === 0) {
        return res.status(400).json({ error: "Array of repository URLs is required" });
      }

      const result = await githubAPI.compareRepositories(repos);
      res.json(result);
    } catch (error: any) {
      console.error("Repository comparison error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // User routes (existing functionality)
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  });

  const httpServer = createServer(app);
  return httpServer;
}

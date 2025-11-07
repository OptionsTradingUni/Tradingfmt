import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Stock price fetcher - free Yahoo Finance API (no key needed)
  app.get("/api/stock/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      
      // Yahoo Finance query API - free, no authentication needed
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol.toUpperCase()}?interval=1d&range=1d`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data?.chart?.result?.[0]) {
        return res.status(404).json({ error: "Symbol not found" });
      }
      
      const result = data.chart.result[0];
      const quote = result.meta;
      const currentPrice = quote.regularMarketPrice;
      const previousClose = quote.previousClose || quote.chartPreviousClose;
      const change = currentPrice - previousClose;
      const changePercent = ((change / previousClose) * 100).toFixed(2);
      
      res.json({
        symbol: symbol.toUpperCase(),
        currentPrice: currentPrice.toFixed(2),
        previousClose: previousClose.toFixed(2),
        change: change.toFixed(2),
        changePercent: changePercent,
        marketCap: quote.marketCap,
        currency: quote.currency || "USD"
      });
    } catch (error) {
      console.error("Stock fetch error:", error);
      res.status(500).json({ error: "Failed to fetch stock data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

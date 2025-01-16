import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

const EnhancedTradingDashboard = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [marketData, setMarketData] = useState([]);
  const [technicalIndicators, setTechnicalIndicators] = useState({});
  const [sentimentMetrics, setSentimentMetrics] = useState({});
  const [volatilityMetrics, setVolatilityMetrics] = useState({});

  const popularStocks = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "META",
    "TSLA",
    "NVDA",
    "AMD",
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedStock]);

  const updateRealTimeData = () => {
    const newDataPoint = {
      timestamp: new Date().toISOString(),
      price: Math.random() * 100 + 200,
      volume: Math.random() * 1000,
    };

    // Update technical indicators
    setTechnicalIndicators({
      sma: (Math.random() * 10 + 190).toFixed(2),
      ema: (Math.random() * 10 + 195).toFixed(2),
      rsi: (Math.random() * 100).toFixed(2),
    });

    // Update sentiment metrics
    setSentimentMetrics({
      sentimentScore: (Math.random() * 2 - 1).toFixed(2),
      emotionClass: ["Fear", "Greed", "Neutral", "Optimistic"][
        Math.floor(Math.random() * 4)
      ],
      searchVolume: Math.floor(Math.random() * 1000),
      socialEngagement: Math.floor(Math.random() * 10000),
      sentimentVolume: Math.floor(Math.random() * 1000),
    });

    // Update volatility metrics
    setVolatilityMetrics({
      earningsSurprise: (Math.random() * 20 - 10).toFixed(2),
      vixIndex: (Math.random() * 40).toFixed(2),
      maNews:
        Math.random() > 0.8 ? "Potential merger discussion detected" : null,
    });

    // Update market data
    setMarketData((prev) => [...prev.slice(-30), newDataPoint]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Stock Selector */}
      <div>
        <label htmlFor="stock-selector">Select Stock:</label>
        <select
          id="stock-selector"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          {popularStocks.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
      </div>

      {/* Main Metrics Grid */}
      <div style={{ margin: "20px 0" }}>
        <h2>Current Price</h2>
        <p>${marketData[marketData.length - 1]?.price.toFixed(2) || 0}</p>

        <h3>Technical Indicators</h3>
        <p>SMA: {technicalIndicators.sma}</p>
        <p>EMA: {technicalIndicators.ema}</p>
        <p>RSI: {technicalIndicators.rsi}</p>
      </div>

      {/* Charts Section */}
      <div>
        <h3>Price Movement</h3>
        <LineChart
          width={500}
          height={300}
          data={marketData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>

        <h3>Trading Volume</h3>
        <BarChart
          width={500}
          height={300}
          data={marketData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Sentiment and Volatility Metrics */}
      <div>
        <h3>Sentiment Overview</h3>
        <p>Score: {sentimentMetrics.sentimentScore}</p>
        <p>Emotion: {sentimentMetrics.emotionClass}</p>

        <h3>Volatility Metrics</h3>
        <p>Earnings Surprise: {volatilityMetrics.earningsSurprise}%</p>
        <p>VIX Index: {volatilityMetrics.vixIndex}</p>
        {volatilityMetrics.maNews && (
          <p>
            <strong>M&A Alert:</strong> {volatilityMetrics.maNews}
          </p>
        )}
      </div>
    </div>
  );
};

export default EnhancedTradingDashboard;

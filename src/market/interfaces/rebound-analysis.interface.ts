export interface ReboundAnalysis {
  symbol: string;
  recentLow: number;
  currentPrice: number;
  reboundPercent: number;
  greenCandles: number;
  risingCloses: boolean;
  trend: 'recovering' | 'falling' | 'neutral';
}
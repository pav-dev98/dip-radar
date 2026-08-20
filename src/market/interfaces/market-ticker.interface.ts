export interface MarketTicker {
    symbol: string;
    price: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
    quoteVolume: number;

    distanceFromLow: number;
}
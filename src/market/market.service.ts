import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import WebSocket from 'ws';
import { MarketTicker } from './interfaces/market-ticker.interface';

@Injectable()
export class MarketService implements OnModuleInit, OnModuleDestroy {
    private socket?: WebSocket;

    private readonly tickers = new Map<string, MarketTicker>();

    onModuleInit() {
        this.socket = new WebSocket(
            'wss://stream.binance.com:9443/ws/!miniTicker@arr',
        );

        this.socket.on('open', () => {
            console.log('Connected to Binance market stream');
        });

        this.socket.on('message', (data) => {
            const rawTickers = JSON.parse(data.toString());

            console.log('Tickers received:', rawTickers.length);

            for (const ticker of rawTickers) {
                const symbol = ticker.s;

                // Por ahora nos interesan pares contra USDT
                if (!symbol.endsWith('USDT')) {
                    continue;
                }

                const price = Number(ticker.c);
                const open = Number(ticker.o);

                const changePercent = open > 0 ? ((price - open) / open) *100 : 0;

                const low = Number(ticker.l);
                const distanceFromLow = low > 0 ? ((price - low )/low) * 100 : 0;

                const marketTicker: MarketTicker = {
                    symbol,
                    price: Number(ticker.c),
                    changePercent,
                    high: Number(ticker.h),
                    low: Number(ticker.l),
                    volume: Number(ticker.v),
                    quoteVolume: Number(ticker.q),
                    distanceFromLow,
                };

                this.tickers.set(symbol, marketTicker);
            }

            // console.log(`Tracking ${this.tickers.size} USDT markets`);
        });

        this.socket.on('error', (error) => {
            console.error('Binance WebSocket error:', error);
        });
    }

    getTickers(): MarketTicker[] {
        return Array.from(this.tickers.values());
    }

    getTicker(symbol: string): MarketTicker | undefined {
        return this.tickers.get(symbol.toUpperCase());
    }

    onModuleDestroy() {
        this.socket?.close();
    }
    getDipCandidates():MarketTicker[]{
        return Array.from(this.tickers.values())
        .filter((ticker) => ticker.changePercent <= -5)
        .filter((ticker) => ticker.distanceFromLow <= 10)
        .filter((ticker) => ticker.quoteVolume >= 1_000_000)
        .sort((a, b) => a.distanceFromLow - b.distanceFromLow);
    }
}
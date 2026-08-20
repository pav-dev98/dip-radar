import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import WebSocket from 'ws';

@Injectable()
export class MarketService implements OnModuleInit,OnModuleDestroy{
    private socket?: WebSocket;
    private lastPrice?: number;

    onModuleInit() {
    this.socket = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@trade',
    );

    this.socket.on('message', (data) => {
      const trade = JSON.parse(data.toString());

      this.lastPrice = Number(trade.p);

      console.log('BTC/USDT:', this.lastPrice);
    });

    this.socket.on('error', (error) => {
      console.error('Binance WebSocket error:', error);
    });
  }
    getLastPrice(){
       return {
        symbol: 'BTCUSDT',
        price: this.lastPrice,
       }
    }
    onModuleDestroy(){
        this.socket?.close();
    }
}

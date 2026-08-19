# 📡 DipRadar

A real-time crypto market scanner that detects dips, volatility and potential rebound opportunities using Binance market data.

> **DipRadar does not execute trades.** It analyzes market data and highlights potential opportunities for manual evaluation.

## 🎯 Goal

Keep it simple:

1. Read real-time crypto market data.
2. Detect unusual price drops and volatility.
3. Identify possible rebound patterns.
4. Calculate an opportunity score.
5. Display the best candidates in a simple dashboard.

## 🧠 Opportunity Score

DipRadar will rank detected opportunities from `0` to `100`.

The score may consider:

- Recent price drop
- Volatility
- Trading volume
- Liquidity
- Price recovery
- Historical rebound behavior

A high score means that the asset matches more of the strategy's criteria. It **does not guarantee** that the price will increase.

## 🏗️ Initial Architecture

```text
Binance Market Data
        │
        ▼
     NestJS
        │
        ▼
 Market Scanner
        │
        ▼
 Opportunity Score
        │
        ▼
    REST / WS API
        │
        ▼
 React Dashboard
```

## 🛠️ Stack

### Backend
- Node.js
- TypeScript
- NestJS
- Binance public market data

### Frontend
- React
- TypeScript

Additional infrastructure will be introduced only when needed.

## 🚧 Roadmap

- [ ] Connect to Binance public market data
- [ ] Track cryptocurrency prices
- [ ] Calculate short-term volatility
- [ ] Detect price drops
- [ ] Detect potential rebounds
- [ ] Implement opportunity score
- [ ] Expose opportunities through API
- [ ] Build dashboard
- [ ] Add paper trading
- [ ] Track strategy performance
- [ ] Backtest detection strategies

## ⚠️ Disclaimer

DipRadar is an educational and experimental software project.

It does not provide financial advice, guarantee profits, or automatically execute trades. Cryptocurrency markets are highly volatile and involve significant risk.

## 📄 License

MIT
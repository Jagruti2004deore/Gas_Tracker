# ⚡ Real-Time Cross-Chain Gas Price Tracker with Wallet Simulation

A real-time dashboard to track gas prices across **Ethereum**, **Polygon**, and **BNB Chain**, simulate transaction costs in USD, and visualize gas price volatility through candlestick charts — all using native WebSocket RPCs and on-chain Uniswap V3 data.
---

## 📌 Features

✅ Real-time gas prices via native **WebSocket RPCs**  
✅ **Candlestick chart** of gas price volatility (15-minute intervals)  
✅ Simulate **ETH/MATIC/BNB** transaction cost in **USD**  
✅ Accurate USD prices from **Uniswap V3 ETH/USDC pool** using logs  
✅ Dynamic alerts when gas prices fall below set thresholds  
✅ Switch between **Live Mode** and **Simulation Mode**  
✅ Built with **React**, **Zustand**, **Ethers.js**, and **Lightweight-Charts**



| Tool               | Description                       |
| ------------------ | --------------------------------- |
| React.js           | Frontend framework                |
| Zustand            | Global state management           |
| Ethers.js          | Web3 interactions & decoding logs |
| Bootstrap 5        | UI styling                        |
| Lightweight-Charts | Candlestick chart visualization   |
| WebSocketProvider  | Live gas price updates            |
| Uniswap V3 Logs    | Real ETH/USD pricing from swaps   |


1️⃣ Install Dependencies
npm install

2️⃣ Add Environment Variables
Create a .env file:

3️⃣ Add the following:
REACT_APP_ETH_RPC_WSS=wss://mainnet.infura.io/ws/v3/YOUR_KEY
REACT_APP_POLYGON_RPC_WSS=wss://polygon-rpc.com
REACT_APP_BSC_RPC_WSS=wss://bsc-ws-node.nariox.org:443

4️⃣ Start the App
npm start

📉 Candlestick Chart (15-Minute Interval)
Aggregates baseFeePerGas every 15 minutes
Captures open, high, low, and close
Real-time updates using Zustand and WebSocket

Gas Simulation Example
When user inputs 0.5 ETH and network fees are:
baseFee = 30 gwei
priorityFee = 2 gwei
usdPrice = 3200

💡 Calculation:
costUSD = (30 + 2) * 21000 * 3200 / 1e9 ≈ $2.13
Uses Uniswap V3 pool 0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
Decodes sqrtPriceX96 to derive ETH/USD

📢 Gas Price Alerts
Get notified when:
Ethereum gas < 20 Gwei
Polygon gas < 50 Gwei
BNB Chain gas < 5 Gwei

Alerts appear every 60s using react-toastify.

🧩 Zustand State Management
{
  mode: 'live' | 'simulation',
  chains: {
    ethereum: { baseFee, priorityFee, history: GasPoint[] },
    polygon: { ... },
    bsc: { ... }
  },
  usdPrice: number
}
Mode toggle ensures shared state across widgets and charts.

📂 Folder Structure
src/
├── components/
│   ├── Chart.jsx
│   ├── GasWidget.jsx
│   ├── GasSimulator.jsx
│   └── AlertHandler.jsx
│   └── ModeToggle.jsx
│    └── GasAlerts.jsx
│    └── PriceDisplay.jsx
├── hooks/
│   ├── useGasFeed.js
│   ├── useETHPrice.js
│   └── useCandlestick.js
├── store/
│   └── gasStore.js
├── utils/
│   └── format.js
├── App.js
└── index.js



🧪 Demo Walkthrough
Shows live gas prices updating via WebSockets
User enters simulated transaction value
Calculates gas cost in USD across all 3 chains
Gas alert shown when threshold is hit
Candlestick chart updates every 15 minutes

🤝 Contributing
PRs are welcome! For major changes, open an issue first to discuss.



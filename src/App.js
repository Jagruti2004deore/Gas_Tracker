import React from 'react';
import useGasFeed from './hooks/useGasFeed';
import ModeToggle from './components/ModeToggle';
import ChainGasWidget from './components/ChainGasWidget';
import TransactionSimulator from './components/TransactionSimulator';
import Chart from './components/Chart';
import GasAlert from './components/GasAlert';
import PriceDisplay from './components/PriceDisplay';
import { useGasStore } from './store/gasStore';
import { buildCandlestickData } from './utils/helpers';

function App() {
  useGasFeed();

  const mode = useGasStore((s) => s.mode);
  const ethHistory = useGasStore((s) => s.chains.ethereum.history);
  const chartData = buildCandlestickData(ethHistory);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">⚡ Cross-Chain Gas Tracker</h2>

      <ModeToggle />
      <GasAlert />
      <PriceDisplay />

      {mode === 'live' && <ChainGasWidget />}
      {mode === 'simulation' && <TransactionSimulator />}

      <h4 className="mt-5">Ethereum Gas Price Candlestick Chart</h4>
      <Chart data={chartData} />
    </div>
  );
}

export default App;

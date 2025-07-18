import { useGasStore } from '../store/gasStore';
import { useState } from 'react';

export default function TransactionSimulator() {
  const { chains, usdPrice, speedMode, setSpeedMode } = useGasStore();
  const [inputValue, setInputValue] = useState(0.5);
  const gasLimit = 21000;

  const parsedAmount = parseFloat(inputValue || 0);

  return (
    <div className="container my-4">
      <h4>Transaction Cost Simulation</h4>

      <div className="mb-3">
        <label className="form-label">Transaction Amount (ETH / MATIC / BNB):</label>
        <input
          type="number"
          className="form-control"
          min={0}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="btn-group mb-3">
        {['slow', 'average', 'fast'].map((mode) => (
          <button
            key={mode}
            className={`btn btn-${speedMode === mode ? 'primary' : 'outline-primary'}`}
            onClick={() => setSpeedMode(mode)}
            disabled={speedMode === mode}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Chain</th>
            <th>Base Fee</th>
            <th>Speed Fee ({speedMode})</th>
            <th>USD Cost</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(chains).map(([chain, { baseFee, speeds }]) => {
            const speedFee = speeds?.[speedMode] || 0;
            const gasFeeInETH = speedFee * gasLimit * 1e-9;
            const usdCost = typeof usdPrice === 'number'
              ? gasFeeInETH * usdPrice * parsedAmount
              : 0;

            return (
              <tr key={chain}>
                <td>{chain}</td>
                <td>{baseFee?.toFixed(2)} Gwei</td>
                <td>{speedFee?.toFixed(2)} Gwei</td>
                <td>${usdCost.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

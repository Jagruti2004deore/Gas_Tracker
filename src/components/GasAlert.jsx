import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useGasStore } from '../store/gasStore';

const thresholds = {
  ethereum: 20,  // Gwei
  polygon: 50,   // Gwei
  bsc: 5,        // Gwei
};

export default function GasAlerts() {
  const [lastAlerted, setLastAlerted] = useState({});
  const chains = useGasStore((state) => state.chains);
  const mode = useGasStore((state) => state.mode);

  const checkAlerts = useCallback(() => {
    const now = Date.now();

    Object.entries(chains).forEach(([chain, data]) => {
      const threshold = thresholds[chain];
      const gas = data?.baseFee + data?.priorityFee;

      if (typeof gas === 'number' && threshold !== undefined) {
        const last = lastAlerted[chain] || 0;

        if (gas < threshold && now - last > 60000) {
          toast.info(`⚠️ Low gas on ${chain.toUpperCase()}: ${gas.toFixed(2)} Gwei`, {
            toastId: `${chain}-gas-alert`,
            autoClose: 8000,
            theme: 'colored',
            position: 'top-right',
          });

          setLastAlerted((prev) => ({
            ...prev,
            [chain]: now,
          }));
        }
      }
    });
  }, [chains, lastAlerted]);

  useEffect(() => {
    if (mode !== 'live') return;
    const interval = setInterval(checkAlerts, 10000);
    return () => clearInterval(interval);
  }, [mode, checkAlerts]);

  return null;
}

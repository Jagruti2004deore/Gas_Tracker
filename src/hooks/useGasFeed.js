import { useEffect } from 'react';
import { WebSocketProvider } from 'ethers';
import { useGasStore } from '../store/gasStore';

const RPC_ENDPOINTS = {
  ethereum: process.env.REACT_APP_ETH_RPC_WSS,
  polygon: process.env.REACT_APP_POLYGON_RPC_WSS,
  arbitrum: process.env.REACT_APP_ARBITRUM_RPC_WSS,
  bsc: process.env.REACT_APP_BSC_RPC_WSS,
};

export default function useGasFeed() {
  const setGas = useGasStore((s) => s.setGas);

  useEffect(() => {
    const providers = [];

    Object.entries(RPC_ENDPOINTS).forEach(([chain, url]) => {
      if (!url) {
        console.error(`❌ Missing WebSocket RPC URL for ${chain}`);
        return;
      }

      try {
        const provider = new WebSocketProvider(url);
        providers.push(provider);

        const onBlock = async (blockNumber) => {
          try {
            const block = await provider.getBlock(blockNumber);
            const baseFeeGwei = block?.baseFeePerGas
              ? Number(block.baseFeePerGas) / 1e9
              : 0;

            setGas(chain, {
              baseFee: baseFeeGwei,
              priorityFee: 2,
              speeds: {
                slow: baseFeeGwei + 1,
                average: baseFeeGwei + 2,
                fast: baseFeeGwei + 5,
              },
              history: {
                timestamp: block.timestamp,
                baseFee: baseFeeGwei,
              },
            });
          } catch (err) {
            console.warn(`⚠️ Error reading block on ${chain}:`, err.message);
          }
        };

        provider.on('block', onBlock);

        provider._websocket?.addEventListener('close', () => {
          console.warn(`🔌 WebSocket closed for ${chain}`);
        });

      } catch (err) {
        console.error(`❌ Failed to connect WebSocketProvider for ${chain}:`, err.message);
      }
    });

    return () => {
      providers.forEach((provider) => {
        try {
          provider.off?.('block');
          provider.destroy?.(); // ethers v6
          provider._websocket?.close?.(); // ethers v5 fallback
        } catch (err) {
          console.warn('⚠️ Error cleaning up provider:', err.message);
        }
      });
    };
  }, [setGas]);
}

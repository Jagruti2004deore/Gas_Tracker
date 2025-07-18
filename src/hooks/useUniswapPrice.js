import { useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';

export const useUniswapPrice = (setUsdPrice) => {
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const provider = new JsonRpcProvider(
          process.env.REACT_APP_ETH_RPC_HTTP // ✅ Use HTTP for eth_call
        );

        const response = await provider.send('eth_call', [
          {
            to: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419', // Chainlink ETH/USD oracle
            data:
              '0xfeaf968c' + // aggregator.latestRoundData()
              '0000000000000000000000000000000000000000000000000000000000000000' +
              '0000000000000000000000000000000000000000000000000000000000000000' +
              '0000000000000000000000000000000000000000000000000000000000000000'
          },
          'latest'
        ]);

        if (!response?.result || response.result.length < 194) {
          console.warn('Invalid response from Chainlink oracle');
          return;
        }

        const hexPrice = response.result.slice(130, 194); // price slot
        const usd = parseInt(hexPrice, 16) / 1e8;

        if (typeof setUsdPrice === 'function') {
          setUsdPrice(usd.toFixed(2));
        }
      } catch (err) {
        console.error('Error fetching ETH/USD from Chainlink:', err);
      }
    };

    fetchPrice();

    // Optional: Poll every 60s
    // const interval = setInterval(fetchPrice, 60000);
    // return () => clearInterval(interval);

  }, [setUsdPrice]);
};

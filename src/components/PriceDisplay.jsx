import React, { useState } from 'react';
import { useUniswapPrice } from '../hooks/useUniswapPrice';

export default function PriceDisplay() {
  const [usdPrice, setUsdPrice] = useState(null);

  useUniswapPrice(setUsdPrice);

  const formattedPrice = typeof usdPrice === 'number' 
    ? `$${usdPrice.toFixed(2)}`
    : 'Fetching...';

  return (
    <div className="text-center mt-3">
      <h5>ETH/USD: {formattedPrice}</h5>
    </div>
  );
}

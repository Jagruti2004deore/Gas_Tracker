// Converts gas history to 15-minute candlestick data
export function buildCandlestickData(history = []) {
  const grouped = {};

  for (const { timestamp, baseFee } of history) {
    const bucket = Math.floor(timestamp / 900); // 900s = 15 minutes
    const time = bucket * 900;

    if (!grouped[bucket]) {
      grouped[bucket] = {
        open: baseFee,
        high: baseFee,
        low: baseFee,
        close: baseFee,
        time,
      };
    } else {
      grouped[bucket].high = Math.max(grouped[bucket].high, baseFee);
      grouped[bucket].low = Math.min(grouped[bucket].low, baseFee);
      grouped[bucket].close = baseFee; // most recent in bucket
    }
  }

  // Ensure result is sorted by time
  return Object.values(grouped).sort((a, b) => a.time - b.time);
}

import { useGasStore } from '../store/gasStore';
import { Gauge, Flame, TrendingUp } from 'lucide-react'; // optional icons (needs `lucide-react`)

export default function ChainGasWidget() {
  const { chains } = useGasStore();

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">🔥 Live Gas Prices</h2>
      <div className="row g-4">
        {Object.entries(chains).map(([name, data]) => {
          const baseFee = data?.baseFee ?? 0;
          const priorityFee = data?.priorityFee ?? 0;

          const gradientClass = getChainGradient(name);

          return (
            <div key={name} className="col-12 col-md-6 col-lg-3">
              <div
                className={`card text-black shadow-lg border-0 ${gradientClass} h-100 rounded-4 hover-zoom`}
              >
                <div className="card-header text-capitalize bg-transparent border-0 fs-5 fw-semibold text-center">
                  <Gauge size={20} className="me-2" />
                  {name}
                </div>
                <div className="card-body text-center">
                  <p className="card-text fs-6">
                    <Flame size={16} className="me-1" />
                    Base Fee: <strong>{baseFee.toFixed(2)}</strong> Gwei
                  </p>
                  <p className="card-text fs-6">
                    <TrendingUp size={16} className="me-1" />
                    Priority Fee: <strong>{priorityFee.toFixed(2)}</strong> Gwei
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Add background gradient based on chain
function getChainGradient(chain) {
  switch (chain.toLowerCase()) {
    case 'ethereum':
      return 'bg-gradient-eth';
    case 'polygon':
      return 'bg-gradient-poly';
    case 'arbitrum':
      return 'bg-gradient-arb';
    case 'bsc':
      return 'bg-gradient-bsc';
    default:
      return 'bg-secondary';
  }
}

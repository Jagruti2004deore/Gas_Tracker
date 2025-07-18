// src/components/ModeToggle.jsx
import React from 'react';
import { useGasStore } from '../store/gasStore';

export default function ModeToggle() {
  const mode = useGasStore((state) => state.mode);
  const setMode = useGasStore((state) => state.setMode);

  const handleToggle = () => {
    const nextMode = mode === 'live' ? 'simulation' : 'live';
    setMode(nextMode);
  };

  return (
    <div className="text-center mb-3">
      <button
        className={`btn ${mode === 'live' ? 'btn-success' : 'btn-outline-secondary'}`}
        onClick={handleToggle}
      >
        Switch to {mode === 'live' ? 'Simulation' : 'Live'} Mode
      </button>
    </div>
  );
}

import React from 'react';

interface WalletCardProps {
  balance: number;
  currency?: string;
}

export function WalletCard({ balance, currency = 'Rwf' }: WalletCardProps) {
  return (
    <div className="relative p-6 rounded-xl bg-gradient-to-br from-red-800 to-red-900 text-white shadow-lg">
      <div className="space-y-4">
        <h2 className="text-xl font-normal">Available Balance</h2>
        <p className="text-3xl font-semibold">{balance} {currency}</p>
        
        <button 
          className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          onClick={() => {/* Handle deposit */}}
        >
          <span className="text-xl">+</span>
          <span className="ml-2">Deposit</span>
        </button>
      </div>
    </div>
  );
}

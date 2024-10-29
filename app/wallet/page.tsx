'use client';

import React from 'react';
import { WalletCard } from '../../components/wallet/WalletCard';
import { TransactionList } from '../../components/wallet/TransactionList';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export default function WalletPage(): React.JSX.Element {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'DEPOSIT',
      amount: 15,
      date: 'Mon, 20 Mar 2023 14:44:17 GMT',
      status: 'SUCCESS'
    },
    // Add more transactions...
  ];

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Wallet</h1>
        <button className="p-2 rounded-full hover:bg-gray-100">
          {/* Add refresh icon */}
        </button>
      </div>
      
      <WalletCard balance={150} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

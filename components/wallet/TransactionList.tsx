import React from 'react';
import { Transaction } from '../../types/wallet';

export function TransactionList({ transactions }: { transactions: Transaction[] }): React.JSX.Element {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Wallet Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{transaction.type}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${transaction.amount}</p>
              <p className={`text-sm ${
                transaction.status === 'SUCCESS' ? 'text-green-500' : 
                transaction.status === 'FAILED' ? 'text-red-500' : 
                'text-yellow-500'
              }`}>
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

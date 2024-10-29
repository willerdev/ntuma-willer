export type Transaction = {
  id: string;
  type: string;
  date: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}; 
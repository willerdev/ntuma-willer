import MarketDetails from './market-details';

// This ensures Next.js knows which routes to pre-render
export async function generateStaticParams() {
  const markets = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];

  return markets.map((market) => ({
    id: market.id,
  }));
}

export default function MarketPage({ params }: { params: { id: string } }) {
  return <MarketDetails id={params.id} />;
}

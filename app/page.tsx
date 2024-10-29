import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { Pattern } from '../components/ui/pattern';

const markets = [
  {
    id: 1,
    name: 'Downtown Market',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: 'Kigali - Rwanda',
    rating: 0.0,
  },
  {
    id: 2,
    name: 'Kimisagara Market',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: 'Kimisagara - Kabeza',
    rating: 0.0,
  },
  {
    id: 3,
    name: 'Kimironko',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    location: 'Kigali - Rwanda',
    rating: 0.0,
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="relative">
        <Pattern className="absolute inset-0 -z-10" />
        <div className="container py-12 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
            CHOOSE YOUR NEAREST MARKET
            </h1>
            <p className="text-xl text-muted-foreground">
              Order fresh groceries from your favorite local markets and get them delivered to your doorstep.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-6 space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Popular Markets</h2>
            <Button variant="link">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market) => (
              <Link href={`/markets/${market.id}`} key={market.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{market.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {market.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {market.rating}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">1. Choose a Market</h3>
              <p className="text-muted-foreground">Browse through our selection of local markets</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">2. Select Products</h3>
              <p className="text-muted-foreground">Pick the items you want to purchase</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">3. Complete Purchase</h3>
              <p className="text-muted-foreground">Checkout securely and receive your items</p>
            </Card>
          </div>
        </section>

        <footer className="hidden md:block text-center text-sm text-muted-foreground pt-8">
          Built with determination by{' '}
          <Link 
            href="https://github.com/willerdev" 
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Willerdev
          </Link>
        </footer>
      </div>
    </div>
  );
}
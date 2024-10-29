import Link from 'next/link';
import { ShoppingBag, Search, User } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <img src="https://play-lh.googleusercontent.com/A9tAWzuwzni47Bd4G78IOdSsqxTrBHLxGmwW6FDfUWbOYV8smng0Op-RJg-E_YOKFumA" alt="Ntuma Logo" className="w-full h-full object-contain" />
          </div>
          <span className="hidden md:inline-block font-bold text-xl">Ntuma</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {/* <Link href="/markets" className="text-sm font-medium">Markets</Link> */}
            <Link href="/categories" className="text-sm font-medium">Categories</Link>
            <Link href="/orders" className="text-sm font-medium">Orders</Link>
            <Link href="/chat" className="text-sm font-medium">Chat</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/wallet">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
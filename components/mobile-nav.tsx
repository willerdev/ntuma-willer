'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBasket, MessageSquare, Settings, LayoutGrid } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/categories', label: 'Categories', icon: LayoutGrid },
    { href: '/orders', label: 'Orders', icon: ShoppingBasket },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
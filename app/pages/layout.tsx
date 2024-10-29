import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../../components/theme-provider';
import { Toaster } from '../../components/ui/sonner';
import { AuthProvider } from '../../components/auth-provider';
import Header from '../../components/header';
import MobileNav from '../../components/mobile-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ntuma - Quick Grocery Delivery',
  description: 'Order groceries from your favorite local markets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="pb-16 md:pb-0">{children}</main>
              <MobileNav />
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
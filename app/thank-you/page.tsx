'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrderDetails(orderDoc.data());
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    }

    fetchOrder();
  }, [orderId]);

  return (
    <div className="container max-w-2xl py-12">
      <Card className="text-center p-6">
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Thank You for Your Order!</h1>
          <p className="text-muted-foreground">
            Your order has been successfully placed and will be delivered soon.
          </p>
          {orderDetails && (
            <div className="text-left space-y-2">
              <p>Order ID: {orderId}</p>
              <p>Total Amount: ${orderDetails.total.toFixed(2)}</p>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
            </div>
          )}
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/orders">
              <Button>View Orders</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

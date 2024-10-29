'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../components/auth-provider';
import { CartItem, cartStore } from '../../lib/cart-store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { CreditCard, Smartphone } from 'lucide-react';
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useToast } from '../../hooks/use-toast';

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('mobile');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const items = cartStore.getCart();
    if (items.length === 0) {
      router.push('/orders');
      return;
    }
    setCart(items);
  }, [router]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Create order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart,
        total: cartTotal + 5, // Including delivery fee
        status: 'pending',
        paymentMethod,
        createdAt: serverTimestamp(),
      });

      // Create payment record
      await addDoc(collection(db, 'payments'), {
        orderId: orderRef.id,
        userId: user.uid,
        amount: cartTotal + 5,
        status: 'pending',
        method: paymentMethod,
        createdAt: serverTimestamp(),
      });

      // Clear cart and redirect to thank you page
      cartStore.clearCart();
      router.push(`/thank-you?orderId=${orderRef.id}`);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as 'card' | 'mobile')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mobile" id="mobile" />
              <Label htmlFor="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Money
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'mobile' && (
            <div className="space-y-4">
              <Input placeholder="Enter Mobile Money Number" />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <Input placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVC" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(cartTotal + 5).toFixed(2)}</span>
            </div>
          </div>
          <Button 
            className="w-full" 
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

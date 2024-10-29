'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem, cartStore } from '../../lib/cart-store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useAuthContext } from '../../components/auth-provider';

export default function OrdersPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setCart(cartStore.getCart());
  }, []);

  const updateQuantity = (productId: string, delta: number) => {
    cartStore.updateQuantity(productId, delta);
    setCart(cartStore.getCart());
  };

  const removeItem = (productId: string) => {
    cartStore.updateQuantity(productId, -999); // Remove item completely
    setCart(cartStore.getCart());
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to proceed with checkout",
        variant: "destructive",
      });
      router.push('/auth/login');
      return;
    }

    router.push('/checkout');
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container py-6">
        <Card className="text-center p-6">
          <CardContent className="space-y-4">
            <div className="text-4xl">🛒</div>
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Browse our markets to add items to your cart
            </p>
            <Button onClick={() => router.push('/')}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} / {item.unit}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

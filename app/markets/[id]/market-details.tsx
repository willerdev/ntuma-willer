'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Card, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../hooks/use-toast';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { CartItem, cartStore } from '../../../lib/cart-store';

interface Product {
  id: string;   
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  unit: string;
}

export default function MarketDetails({ id }: { id: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(
          collection(db, 'products'),
          where('marketId', '==', id)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load products',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [id, toast]);

  useEffect(() => {
    setCart(cartStore.getCart());
  }, []);

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const addToCart = (product: Product) => {
    cartStore.addItem(product);
    setCart(cartStore.getCart());
    toast({
      title: 'Added to cart',
      description: `${product.name} added to your cart`,
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    cartStore.updateQuantity(productId, delta);
    setCart(cartStore.getCart());
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-6 space-y-6">
      <Tabs defaultValue={categories[0]} className="space-y-4">
        <TabsList className="w-full justify-start overflow-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="min-w-[100px]">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <Card key={product.id}>
                    <div className="aspect-video relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <p className="font-mono font-semibold mt-2">
                        ${product.price.toFixed(2)} / {product.unit}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      {cart.find((item) => item.id === product.id) ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-mono w-8 text-center">
                            {
                              cart.find((item) => item.id === product.id)
                                ?.quantity
                            }
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 md:p-6">
          <div className="container flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ShoppingCart className="h-5 w-5" />
              <div>
                <p className="font-semibold">
                  {cart.reduce((total, item) => total + item.quantity, 0)} items
                </p>
                <p className="text-sm text-muted-foreground">
                  Total: ${cartTotal.toFixed(2)}
                </p>
              </div>
            </div>
            <Button>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}

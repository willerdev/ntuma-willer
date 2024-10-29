'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Card, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { CartItem, cartStore } from '../../../lib/cart-store';
import { useToast } from '../../../hooks/use-toast';
import { categories, CategoryId } from '../../../lib/categories';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  unit: string;
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(
          collection(db, 'products'),
          where('category', '==', getCategoryName(params.id))
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
  }, [params.id, toast]);

  useEffect(() => {
    setCart(cartStore.getCart());
  }, []);

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

  function getCategoryName(id: string): string {
    return categories[id as CategoryId]?.name || '';
  }

  if (loading) {
    return <div className="container py-6">Loading...s</div>;
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">{getCategoryName(params.id)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="aspect-video relative">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{product.name} </h3>
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
                    {cart.find((item) => item.id === product.id)?.quantity}
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
    </div>
  );
}

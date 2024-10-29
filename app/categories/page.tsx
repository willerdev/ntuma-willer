import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Utensils, ShoppingBasket, Apple, Coffee, Beef, Fish } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    icon: Apple,
    color: 'text-green-500',
    description: 'Fresh produce from local markets',
  },
  {
    id: 2,
    name: 'Meat & Fish',
    icon: Fish,
    color: 'text-red-500',
    description: 'Fresh meat and seafood',
  },
  {
    id: 3,
    name: 'Groceries',
    icon: ShoppingBasket,
    color: 'text-orange-500',
    description: 'Daily essentials and pantry items',
  },
  {
    id: 4,
    name: 'Ready Meals',
    icon: Utensils,
    color: 'text-purple-500',
    description: 'Prepared meals and takeaway',
  },
  {
    id: 5,
    name: 'Beverages',
    icon: Coffee,
    color: 'text-brown-500',
    description: 'Drinks and refreshments',
  },
  {
    id: 6,
    name: 'Meat',
    icon: Beef,
    color: 'text-red-700',
    description: 'Fresh meat products',
  },
];

export default function CategoriesPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-muted ${category.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const categories = {
  '1': { name: 'Vegetables', icon: 'Leaf' },
  '2': { name: 'Fruits', icon: 'Apple' },
  '3': { name: 'Meat', icon: 'Beef' },
  '4': { name: 'Ready Meals', icon: 'Utensils' },
  '5': { name: 'Beverages', icon: 'Coffee' },
  '6': { name: 'Seafood', icon: 'Fish' },
  '7': { name: 'Dairy', icon: 'Milk' },
  '8': { name: 'Bakery', icon: 'Croissant' },
  '9': { name: 'Snacks', icon: 'Cookie' },
  '10': { name: 'Household', icon: 'Home' }
} as const;

export type CategoryId = keyof typeof categories;

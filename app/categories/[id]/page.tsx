import CategoryPage from './category-page';

export default function Page({ params }: { params: { id: string } }) {
  return <CategoryPage params={params} />;
}

export async function generateStaticParams() {
  return [
    { id: '1' },  // Fruits & Vegetables
    { id: '2' },  // Meat & Fish
    { id: '3' },  // Groceries
    { id: '4' },  // Ready Meals
    { id: '5' },  // Beverages
    { id: '6' },  // Meat
    { id: '7' },  // Dairy
    { id: '8' },  // Bakery
    { id: '9' },  // Snacks
    { id: '10' }, // Household
  ];
}

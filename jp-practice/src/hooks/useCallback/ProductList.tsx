import React, { useCallback, useState } from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'MacBook Pro' },
  { id: 2, name: 'iPhone 14' },
  { id: 3, name: 'Apple Watch' }
];

const ProductList: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [counter, setCounter] = useState(0);

  // ✅ Memoized function: only changes if `cart` changes
  const handleAddToCart = useCallback((id: number) => {
    setCart((prev) => [...prev, id]);
  }, []);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Force Re-render</button>
      <p>Cart Count: {cart.length}</p>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;

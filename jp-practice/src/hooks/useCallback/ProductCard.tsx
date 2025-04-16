import React from 'react';

type Product = {
  id: number;
  name: string;
};

type Props = {
  product: Product;
  onAddToCart: (id: number) => void;
};

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  console.log(`Rendering: ${product.name}`);
  return (
    <div style={{ marginBottom: "10px" }}>
      <h4>{product.name}</h4>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

export default React.memo(ProductCard); // ⬅️ Only re-renders if props change

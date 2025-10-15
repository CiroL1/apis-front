import { useState } from "react";

export default function CartItem({ product, onQuantityChange }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(product.id, newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b border-subtle-light dark:border-subtle-dark">
      <div className="h-24 w-24 flex-shrink-0">
        <img
          className="h-full w-full rounded object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        {product.size && (
          <p className="text-sm text-muted-light dark:text-muted-dark">
            Size: {product.size}
          </p>
        )}
        <p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-subtle-light dark:bg-subtle-dark text-lg font-medium hover:bg-primary/20 dark:hover:bg-primary/30"
        >
          -
        </button>
        <input
          className="quantity-input w-10 rounded border-subtle-light dark:border-subtle-dark bg-transparent p-0 text-center focus:border-primary focus:ring-primary"
          type="number"
          value={quantity}
          readOnly
        />
        <button
          onClick={handleIncrease}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-subtle-light dark:bg-subtle-dark text-lg font-medium hover:bg-primary/20 dark:hover:bg-primary/30"
        >
          +
        </button>
      </div>
    </div>
  );
}
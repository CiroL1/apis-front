import CartItem from "./CartItem";

export default function CartList({ items, onQuantityChange }) {
  return (
    <div className="divide-y divide-subtle-light dark:divide-subtle-dark rounded-lg border border-subtle-light dark:border-subtle-dark">
      {items.map((item) => (
        <CartItem
          key={item.id}
          product={item}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}
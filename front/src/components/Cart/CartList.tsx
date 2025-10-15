"use client";

import { Product } from "@/components/ProductCard";
import CartItem from "./CartItem";

interface CartListProps {
  items: (Product & { quantity: number; size?: string })[];
  onQuantityChange: (productId: string, quantity: number) => void;
}

export default function CartList({ items, onQuantityChange }: CartListProps) {
  return (
    <div className="divide-y divide-subtle-light dark:divide-subtle-dark rounded-lg border border-subtle-light dark:border-subtle-dark">
      {items.map((item) => (
        <CartItem key={item.id} product={item} onQuantityChange={onQuantityChange} />
      ))}
    </div>
  );
}

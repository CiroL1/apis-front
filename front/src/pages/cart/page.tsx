"use client";

import { useEffect, useState } from "react";
import CartList from "@/components/Cart/CartList";
import OrderSummary from "@/components/Cart/OrderSummary";
import Header from "@/components/Header";
import { Product } from "@/components/ProductCard";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number; size?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = async (productId: string, quantity: number) => {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const updated = await res.json();
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        searchQuery=""
        setSearchQuery={() => {}}
        selectedCategory=""
        setSelectedCategory={() => {}}
        selectedSubcategory=""
        setSelectedSubcategory={() => {}}
        products={[]}
      />
      <main className="flex-1 px-4 py-8 md:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Shopping Cart</h1>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              {loading ? (
                <p className="text-center text-gray-500">Cargando...</p>
              ) : cartItems.length === 0 ? (
                <p className="text-center text-gray-500">No hay productos en el carrito.</p>
              ) : (
                <CartList items={cartItems} onQuantityChange={handleQuantityChange} />
              )}
            </div>

            {/* Resumen de orden */}
            <div className="lg:col-span-1">
              <OrderSummary subtotal={subtotal} isDisabled={cartItems.length === 0} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

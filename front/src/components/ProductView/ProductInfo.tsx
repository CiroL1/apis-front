"use client";

import { FullProduct } from "./ProductDetailContainer";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: FullProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (!res.ok) throw new Error("Error al añadir al carrito");
      toast.success(`Producto "${product.name}" añadido al carrito`);
    } catch (err) {
      console.error(err);
      toast.error("No se pudo añadir el producto");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>

      {product.storageOptions && (
        <div className="space-y-2">
          <p className="font-medium">Storage</p>
          <div className="flex flex-wrap gap-2">
            {product.storageOptions.map((s) => (
              <label
                key={s}
                className={`cursor-pointer rounded border px-4 py-2 text-sm font-medium ${selectedStorage === s ? "border-primary bg-primary/10 text-primary" : "border-gray-300"}`}
              >
                {s}
                <input
                  type="radio"
                  className="sr-only"
                  name="storage"
                  value={s}
                  checked={selectedStorage === s}
                  onChange={() => setSelectedStorage(s)}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {product.colors && (
        <div className="space-y-2">
          <p className="font-medium">Color</p>
          <div className="flex gap-3">
            {product.colors.map((c) => (
              <label key={c} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  className="peer sr-only"
                  checked={selectedColor === c}
                  onChange={() => setSelectedColor(c)}
                />
                <div className={`size-8 rounded-full border ${c} peer-checked:ring-2 peer-checked:ring-primary`} style={{ backgroundColor: c }}></div>
              </label>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleAddToCart} className="w-full rounded-lg bg-primary py-3 text-white font-bold hover:bg-primary/90">
        Add to Cart
      </button>
    </div>
  );
}

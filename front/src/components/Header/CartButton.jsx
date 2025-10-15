import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    async function fetchCartCount() {
      try {
        const res = await fetch("/api/cart/count");
        const data = await res.json();
        setItemCount(data.count);
      } catch (err) {
        console.error("No se pudo obtener el carrito", err);
      }
    }
    fetchCartCount();
  }, []);

  const displayCount = itemCount > 10 ? "+10" : itemCount;

  return (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-gray-700 dark:text-gray-300 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
    >
      <FiShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 text-xs font-semibold text-white bg-red-600 rounded-full flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </Link>
  );
}

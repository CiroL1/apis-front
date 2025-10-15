import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay cada 20 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % product.images.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [product.images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const handleAddToCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Error al añadir al carrito");
      toast.success(`Producto "${product.name}" añadido al carrito con éxito`);
    } catch (err) {
      console.error(err);
      toast.error(`No se pudo añadir "${product.name}" al carrito`);
    }
  };

  return (
    <div className="group relative border rounded-lg p-3 bg-background-light dark:bg-background-dark shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Carrusel */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
        <AnimatePresence initial={false}>
          <motion.img
            key={product.images[currentIndex]}
            src={product.images[currentIndex]}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) handleNext();
              if (info.offset.x > 50) handlePrev();
            }}
          />
        </AnimatePresence>

        {/* Flechas */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Información */}
      <div className="mt-3 space-y-1 flex-1">
        <h3 className="font-semibold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</p>

        {product.category && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Categoría:</span> {product.category}
          </p>
        )}

        {product.subcategories?.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Subcategorías:</span> {product.subcategories.join(", ")}
          </p>
        )}

        {product.featured && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold text-white bg-primary rounded-full">
            Destacado
          </span>
        )}
      </div>

      {/* Botones */}
      <div className="mt-3 flex gap-2 justify-center">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center justify-center px-3 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
          title="Ver producto"
        >
          <FiEye size={20} />
        </Link>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center px-3 py-2 bg-white rounded hover:bg-gray-200 transition"
          title="Añadir al carrito"
        >
          <FiShoppingCart size={20} color="black" />
        </button>
      </div>
    </div>
  );
}

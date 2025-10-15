import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({ product, interval = 20000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  return (
    <div className="flex flex-col gap-4 relative">
      {/* Imagen principal arrastrable */}
      <div
        className="aspect-square w-full overflow-hidden rounded-xl relative cursor-grab"
        ref={containerRef}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={product.images[currentIndex]}
            src={product.images[currentIndex]}
            alt={product.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full object-cover"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) nextImage();
              else if (info.offset.x > 50) prevImage();
            }}
          />
        </AnimatePresence>

        {/* Flechas */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`aspect-square overflow-hidden rounded-lg transition ${
              i === currentIndex ? "ring-2 ring-primary" : "opacity-75 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Thumbnail ${i}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

import { FiX, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsModal({ product, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-4xl w-full overflow-y-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {product.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {product.category ?? "Uncategorized"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Imagen principal */}
            <div>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
                />
              ) : (
                <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                  No image
                </div>
              )}

              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {product.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i}`}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700 hover:ring-2 hover:ring-primary transition-all"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info principal */}
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </p>
                {product.featured && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <FiStar />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-sm leading-relaxed">
                  {product.description ?? "No description available."}
                </p>
              </div>

              {product.subcategories && product.subcategories.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Subcategories</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.subcategories.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Colors</h4>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Storage Options</h4>
                  <ul className="list-disc list-inside text-sm">
                    {product.storageOptions.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between text-sm border-b border-slate-200 dark:border-slate-700 py-1"
                    >
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        {k}
                      </span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
              <div className="space-y-3">
                {product.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 dark:border-slate-700 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      {r.avatar && (
                        <img
                          src={r.avatar}
                          alt={r.user}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {r.user}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {r.date} — ⭐ {r.rating}/5
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
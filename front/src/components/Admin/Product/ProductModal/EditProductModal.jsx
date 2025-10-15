import { useState, useEffect, useRef } from "react";
import ProductBasicInfo from "./ProductBasicInfo";
import CategorySelect from "./ProductCategorySelect";
import ProductImages from "./ProductImages";
import ProductSpecifications from "./ProductSpecifications";
import { FiPlus } from "react-icons/fi";

export default function EditProductModal({ token, product, onClose, onProductUpdated }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState(product.subcategories || []);
  const [price, setPrice] = useState(product.price?.toString() || "");
  const [images, setImages] = useState(product.images?.length ? product.images : [""]);
  const [featured, setFeatured] = useState(product.featured || false);
  const [description, setDescription] = useState(product.description || "");
  const [specifications, setSpecifications] = useState(product.specifications || {});
  const [colors, setColors] = useState(product.colors?.length ? product.colors : [""]);
  const [storageOptions, setStorageOptions] = useState(product.storageOptions?.length ? product.storageOptions : [""]);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  // ✅ Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // ✅ Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categories");
        const data = (await res.json()).map((cat) => ({
          ...cat,
          groups: cat.groups || [],
        }));
        setCategories(data);

        // Preseleccionar categoría si coincide por nombre
        if (product.category) {
          const found = data.find(c => c.name === product.category);
          if (found) setCategory(found);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [product.category]);

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return alert("Select a category");

    setLoading(true);
    try {
      const body = {
        id: product.id,
        name,
        price: Number(price),
        categoryId: category.id,
        subcategories,
        images: images.filter(i => i),
        featured,
        description,
        specifications,
        colors: colors.filter(c => c),
        storageOptions: storageOptions.filter(s => s),
      };

      const res = await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      onProductUpdated(data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      {/* ✅ ref agregado para detectar clics fuera */}
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <ProductBasicInfo name={name} setName={setName} price={price} setPrice={setPrice} />

          {/* Category & Subcategories */}
          <CategorySelect
            categories={categories}
            category={category}
            setCategory={setCategory}
            subcategories={subcategories}
            setSubcategories={setSubcategories}
          />

          {/* Images */}
          <ProductImages images={images} setImages={setImages} />

          {/* Description & Featured */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />
            <label className="text-sm text-gray-700 dark:text-gray-300">Featured</label>
          </div>

          {/* Specifications */}
          <ProductSpecifications specifications={specifications} setSpecifications={setSpecifications} />

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium">Colors</label>
            {colors.map((color, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={color || "#ffffff"}
                  onChange={e => {
                    const newColors = [...colors];
                    newColors[idx] = e.target.value;
                    setColors(newColors);
                  }}
                  className="w-10 h-10 rounded border"
                />
                <span className="flex-1">{color || "Select a color"}</span>
                <button
                  type="button"
                  onClick={() => setColors(colors.filter((_, i) => i !== idx))}
                  className="text-red-500 px-2 py-1 border rounded hover:bg-red-100"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setColors([...colors, "#ffffff"])}
              className="mt-2 text-primary flex items-center gap-1"
            >
              <FiPlus /> Add Color
            </button>
          </div>

          {/* Storage Options */}
          <div>
            <label className="block text-sm font-medium">Storage Options</label>
            {storageOptions.map((s, idx) => (
              <div key={idx} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={s}
                  className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:text-white"
                  onChange={e => {
                    const newS = [...storageOptions];
                    newS[idx] = e.target.value;
                    setStorageOptions(newS);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setStorageOptions(storageOptions.filter((_, i) => i !== idx))}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setStorageOptions([...storageOptions, ""])}
              className="mt-2 text-primary flex items-center gap-1"
            >
              <FiPlus /> Add Option
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border text-gray-700 dark:text-white">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
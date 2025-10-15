import { useEffect, useState } from "react";

const GENERIC_PRODUCT = {
  id: "0",
  name: "Producto Genérico",
  price: 99.99,
  images: [
    "https://via.placeholder.com/600x600",
    "https://via.placeholder.com/600x600/ff0000",
    "https://via.placeholder.com/600x600/00ff00",
  ],
  category: "Categoría genérica",
  subcategories: ["Subgenérica 1", "Subgenérica 2"],
  description: "Descripción genérica del producto.",
  specifications: { Peso: "1kg", Dimensiones: "10x10x10cm" },
  colors: ["black", "white", "red"],
  storageOptions: ["128GB", "256GB"],
  reviews: [
    {
      user: "Usuario Genérico",
      rating: 5,
      comment: "Producto de prueba.",
      date: "Hoy",
      avatar: "https://via.placeholder.com/40",
    },
  ],
};

export default function ProductDetailContainer({ id, children }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el producto");
        const data = await res.json();

        // Normalizamos images
        const normalized = {
          ...data,
          images: data.images || (data.images ? [data.images] : []),
        };

        setProduct(normalized);
      } catch (err) {
        console.error(err);
        setProduct(GENERIC_PRODUCT);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando producto...</p>;
  if (!product) return <p className="text-center py-10">Producto no encontrado</p>;

  return <>{children(product)}</>;
}

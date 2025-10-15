import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

export default function FeaturedProducts({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("http://localhost:8080/api/products/featured");
        if (!res.ok) throw new Error("Failed to fetch featured products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-primary/5 dark:bg-primary/10 py-16 sm:py-24" id="featured-products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Productos destacados
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Descubre nuestros gadgets más populares.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p>Cargando productos...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <a
            className="inline-block bg-primary/10 dark:bg-primary/20 text-primary font-semibold px-8 py-3 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
            href="/products"
          >
            Ver todos los productos
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductsList from "../../components/ProductsList";

const GENERIC_PRODUCTS = [
  {
    id: "1",
    name: "Auriculares inalámbricos",
    price: 149.99,
    images: ["https://lh3.googleusercontent.com/..."],
    category: "Audio",
    subcategories: ["Inalámbricos", "Bluetooth"],
  },
  {
    id: "2",
    name: "Reloj inteligente",
    price: 99.99,
    images: ["https://lh3.googleusercontent.com/..."],
    category: "Wearables",
    subcategories: ["Smartwatch"],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8080/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const normalized = data.map((p) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images : p.images ? [p.images] : [],
        }));

        setProducts(normalized);
      } catch (err) {
        console.error(err);
        const normalized = GENERIC_PRODUCTS.map((p) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images : p.images ? [p.images] : [],
        }));
        setProducts(normalized);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  return (
    <>
      <Header
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />

      {loading ? (
        <div className="container mx-auto px-4 py-16">
          <p>Cargando productos...</p>
        </div>
      ) : (
        <ProductsList
          products={products}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          itemsPerPage={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

import { useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

export default function ProductsList({
  products,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  itemsPerPage = 10,
  currentPage,
  setCurrentPage,
}) {
  // 🔄 Resetear página cuando cambian filtros o búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSubcategory, setCurrentPage]);

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesSubcategory = selectedSubcategory
        ? p.subcategories?.includes(selectedSubcategory)
        : true;
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [products, searchQuery, selectedCategory, selectedSubcategory]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(Math.max(1, currentPage - 1));
  const handleNext = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

  return (
    <section className="bg-primary/5 dark:bg-primary/10 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Filtros de escritorio */}
        <aside className="hidden lg:block w-1/4 xl:w-1/5 sticky top-24">
          <ProductFilters
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
          />
        </aside>

        {/* Grilla de productos */}
        <div className="w-full lg:w-3/4 xl:w-4/5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-subtle-light dark:bg-subtle-dark rounded disabled:opacity-50 hover:bg-primary/20 dark:hover:bg-primary/30 transition"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-subtle-light dark:bg-subtle-dark rounded disabled:opacity-50 hover:bg-primary/20 dark:hover:bg-primary/30 transition"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

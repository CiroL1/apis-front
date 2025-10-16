import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailContainer from "../components/ProductView/ProductDetailContainer";
import ProductGallery from "../components/ProductView/ProductGallery";
import ProductInfo from "../components/ProductView/ProductInfo";
import ProductSpecs from "../components/ProductView/ProductSpecs";
import ProductReviews from "../components/ProductView/ProductReviews";

export default function ProductPage() {
  const { id } = useParams(); // ✅ Hook de React Router
  const productId = id; // no hace falta ver si es array en React Router

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        searchQuery=""
        setSearchQuery={() => {}}
        selectedCategory=""
        setSelectedCategory={() => {}}
        selectedSubcategory=""
        setSelectedSubcategory={() => {}}
        products={[]}
      />

      <ProductDetailContainer id={productId}>
        {(product) => (
          <main className="mx-auto max-w-7xl px-4 py-8 lg:flex lg:gap-12">
            <div className="lg:w-1/2">
              <ProductGallery product={product} />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6">
              <ProductInfo product={product} />
              <ProductSpecs product={product} />
              <ProductReviews product={product} />
            </div>
          </main>
        )}
      </ProductDetailContainer>

      <Footer />
    </div>
  );
}

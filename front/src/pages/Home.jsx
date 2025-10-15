import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Landing/Hero";
import AboutUs from "../components/AboutSection";
import FeaturedProducts from "../components/Landing/FeaturedProducts";
import Footer from "../components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
        console.log("Home rendered")
      <Header
        searchQuery=""
        setSearchQuery={() => {}}
        selectedCategory=""
        setSelectedCategory={() => {}}
        selectedSubcategory=""
        setSelectedSubcategory={() => {}}
        products={[]}
      />
      <main className="flex-grow">
        <Banner />
        <AboutUs />
        <FeaturedProducts searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}

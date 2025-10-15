"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";

export default function ContactPage() {
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
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-16">
        <ContactForm />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
}

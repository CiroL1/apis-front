"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Product } from "./ProductCard";
import Logo from "./Header/Logo";
import NavDesktop from "./Header/NavDesktop";
import SearchBar from "./Header/SearchBar";
import CartButton from "./Header/CartButton";
import MobileMenu from "./Header/MobileMenu";
import UserProfileButton from "./Header/UserProfileButton";
import { useSession } from "@/components/Context/SessionContext";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  products: Product[];
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  products,
}: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showSearch = pathname === "/products";

  const { isLoggedIn, logout } = useSession();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-background-light dark:bg-background-dark border-b border-background-light dark:border-background-dark backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo y título */}
            <div className="flex items-center gap-4">
              <Logo />
              <h1 className="hidden md:block text-xl font-bold text-gray-900 dark:text-white">
                TechGadget
              </h1>
            </div>

            {/* Navegación de escritorio */}
            <NavDesktop pathname={pathname} />

            {/* Botones de acción */}
            <div className="flex items-center gap-2">
              {showSearch && (
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              )}

              <CartButton />

              {/* Botón de usuario solo en desktop */}
              <div className="hidden md:flex">
                <UserProfileButton
                  isLoggedIn={isLoggedIn}
                  onLogout={logout}
                />
              </div>

              {/* Botón de menú hamburguesa para móvil */}
              <button
                className="md:hidden ml-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        products={products}
        pathname={pathname}
      />
    </header>
  );
}

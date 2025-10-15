import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSession } from "./Context/SessionContext";
import Logo from "./Header/Logo";
import NavDesktop from "./Header/NavDesktop";
import SearchBar from "./Header/SearchBar";
import CartButton from "./Header/CartButton";
import MobileMenu from "./Header/MobileMenu";
import UserProfileButton from "./Header/UserProfileButton";

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  products,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showSearch = pathname === "/products";

  const { isLoggedIn, logout } = useSession();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-background-light dark:bg-background-dark border-b border-background-light dark:border-background-dark backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Logo />
              <h1 className="hidden md:block text-xl font-bold text-gray-900 dark:text-white">
                TechGadget
              </h1>
            </div>

            <NavDesktop pathname={pathname} />

            <div className="flex items-center gap-2">
              {showSearch && (
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              )}
              <CartButton />
              <div className="hidden md:flex">
                <UserProfileButton isLoggedIn={isLoggedIn} onLogout={logout} />
              </div>

              <button
                className="md:hidden ml-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

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

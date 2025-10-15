import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProductFilters from "../ProductFilters";
import Logo from "./Logo";
import { useSession } from "../Context/SessionContext";

export default function MobileMenu({
  isOpen,
  setOpen,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  products,
  pathname,
}) {
  const { isLoggedIn, logout, user } = useSession();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: "Sobre nosotros", href: "/faq" },
    { name: "Contacto", href: "/contact" },
  ];

  const showSearch = pathname === "/products";

  const handleDashboardClick = () => {
    if (!user) return;
    if (user.type === "ADMIN") navigate("/admin");
    else navigate("/user");
    setOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background-light dark:bg-background-dark z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Logo size="h-8 w-8" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">TechGadget</h1>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            ✕
          </button>
        </div>

        {/* Perfil Móvil */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className="flex items-center gap-2 w-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle className="w-6 h-6" />
            <span>Perfil</span>
          </button>

          <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${profileOpen ? "max-h-60 mt-2" : "max-h-0"}`}>
            <div className="flex flex-col bg-white dark:bg-background-dark rounded-lg border border-black/10 dark:border-white/10">
              {!isLoggedIn ? (
                <button
                  className="px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 text-left w-full"
                  onClick={() => { navigate("/login"); setOpen(false); }}
                >
                  Log In / Sign Up
                </button>
              ) : (
                <>
                  <button
                    className="px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 text-left w-full"
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </button>
                  <button
                    className="px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 text-left w-full"
                    onClick={() => { logout(); setOpen(false); navigate("/"); }}
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Búsqueda y filtros */}
        {showSearch && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ProductFilters
              products={products}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
          </div>
        )}

        {/* Navegación */}
        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

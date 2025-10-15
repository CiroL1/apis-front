"use client";

import Sidebar from "@/components/Admin/Sidebar";
import ProductSection from "@/components/Admin/Product/ProductSection";
import CategorySection  from "@/components/Admin/Category/CategorySection";
import { useSession } from "@/components/Context/SessionContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";


type Section = "dashboard" | "products" | "categories" | "orders" | "settings";

export default function AdminDashboard() {
  const { token, isLoggedIn, loading } = useSession(); // <-- agregamos loading
  const router = useRouter();
  const [section, setSection] = useState<Section>("products");

  useEffect(() => {
    if (loading) return; // espera a que se cargue el token

    if (!isLoggedIn || !token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      // Comprobar expiración
      if (decoded.exp * 1000 < Date.now()) {
        router.push("/login");
        return;
      }

      // Verificar rol
      if (decoded.type !== "ADMIN") {
        router.push("/login");
        return;
      }
    } catch (err) {
      router.push("/login");
      return;
    }
  }, [token, isLoggedIn, loading, router]);

  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>;
      case "products":
        return <ProductSection />;
      case "categories":
        return <CategorySection />;
      case "orders":
        return <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Orders Section</h2>;
      case "settings":
        return <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings Section</h2>;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar currentSection={section} setSection={setSection} />
      <main className="flex-1 p-8">{renderSection()}</main>
    </div>
  );
}

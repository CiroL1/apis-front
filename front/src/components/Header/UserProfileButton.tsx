"use client";

import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/Context/SessionContext";

export default function UserProfileButton() {
  const { user, isLoggedIn, logout } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDashboardClick = () => {
    if (!user) return;

    // Redirige según el tipo
    if (user.type === "ADMIN") router.push("/admin");
    else router.push("/user");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-full p-2 text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10 focus:outline-none"
      >
        <FaUserCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-background-dark shadow-lg border border-black/10 dark:border-white/10 z-50">
          {!isLoggedIn ? (
            <ul className="flex flex-col">
              <li>
                <a
                  href="/login"
                  className="block px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Log In / Sign Up
                </a>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col">
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => {
                    handleDashboardClick();
                    setIsOpen(false);
                  }}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    router.push("/"); // opcional: redirigir al home
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";

interface NavDesktopProps {
  pathname: string;
}

export default function NavDesktop({ pathname }: NavDesktopProps) {
  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: "Sobre nosotros", href: "/faq" },
    { name: "Contacto", href: "/contact" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm font-medium transition-colors ${
            pathname === item.href ? "text-primary" : "text-gray-700 dark:text-gray-300"
          } hover:text-primary dark:hover:text-primary`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

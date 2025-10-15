"use client";

import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useState } from "react";
import Header from "@/components/Header";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <Header
        searchQuery=""
        setSearchQuery={() => {}}
        selectedCategory=""
        setSelectedCategory={() => {}}
        selectedSubcategory=""
        setSelectedSubcategory={() => {}}
        products={[]}
      />

      {/* Contenido central */}
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          {/* Tabs Login/Register */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                isLogin
                  ? "bg-primary text-white"
                  : "bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                !isLogin
                  ? "bg-primary text-white"
                  : "bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Formulario */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </main>
    </div>
  );
}

// src/RootLayout.jsx
import React from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { SessionProvider } from "./components/Context/SessionContext.jsx"; 
import "./index.css";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <Helmet>
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="bg-background-light dark:bg-background-dark font-display min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "Work Sans, sans-serif",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
            },
            success: { style: { background: "#16a34a", color: "#fff" } },
            error: { style: { background: "#dc2626", color: "#fff" } },
          }}
        />
      </div>
    </SessionProvider>
  );
}

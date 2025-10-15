import React, { createContext, useContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode"; // ⚠️ Importar todo

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    if (savedToken) {
      try {
        const decoded = jwtDecode.default(savedToken); // ⚠️ usar .default
        const exp = decoded.exp * 1000;
        if (Date.now() < exp) {
          setToken(savedToken);
          setUser(decoded);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Token inválido", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    try {
      const decoded = jwtDecode.default(newToken); // ⚠️ usar .default
      setToken(newToken);
      setUser(decoded);
      localStorage.setItem("jwt", newToken);
    } catch (err) {
      console.error("JWT inválido", err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <SessionContext.Provider
      value={{ token, user, login, logout, isLoggedIn: !!token, loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe usarse dentro de SessionProvider");
  }
  return context;
};

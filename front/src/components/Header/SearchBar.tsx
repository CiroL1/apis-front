"use client";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary focus:border-primary w-48 sm:w-64 transition"
    />
  );
}

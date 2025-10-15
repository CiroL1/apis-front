"use client";
import React, { useEffect, useState } from "react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  category: Category | null;
  setCategory: (c: Category | null) => void;
  subcategories: string[];
  setSubcategories: (subs: string[]) => void;
};

export default function CategorySelect({
  categories,
  category,
  setCategory,
  subcategories,
  setSubcategories,
}: Props) {
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  // Cuando cambia la categoría seleccionada
  useEffect(() => {
    if (category) {
      const subs = category.groups?.map(g => g.name) || [];
      setAvailableSubcategories(subs);
      setSubcategories([]); // reiniciamos selección
    } else {
      setAvailableSubcategories([]);
      setSubcategories([]);
    }
  }, [category, setSubcategories]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category?.id || ""}
          onChange={e => {
            const cat = categories.find(c => c.id === e.target.value) || null;
            setCategory(cat);
          }}
          className="mt-1 block w-full border rounded-lg p-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Subcategorías */}
      <div>
        <label className="block text-sm font-medium">Subcategories</label>
        <select
          multiple
          value={subcategories}
          onChange={e =>
            setSubcategories(Array.from(e.target.selectedOptions, o => o.value))
          }
          className="mt-1 block w-full border rounded-lg p-2"
          disabled={availableSubcategories.length === 0}
        >
          {availableSubcategories.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

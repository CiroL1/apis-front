"use client";

import { useState, useRef, useEffect } from "react";
import { Category, SubcategoryGroup } from "./CategorySection";
import { IoClose } from "react-icons/io5";

export default function EditCategoryModal({
  token,
  category,
  onClose,
  onCategoryUpdated,
}: {
  token: string;
  category: Category;
  onClose: () => void;
  onCategoryUpdated: (c: Category) => void;
}) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [groups, setGroups] = useState<SubcategoryGroup[]>(category.groups);
  const [newGroupName, setNewGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // 🟢 Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const addGroup = () => {
    if (!newGroupName.trim()) return;
    setGroups((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: newGroupName.trim() },
    ]);
    setNewGroupName("");
  };

  const removeGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/categories/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description, groups }),
        }
      );
      if (!res.ok) throw new Error("Error updating category");
      const data: Category = await res.json();
      onCategoryUpdated(data);
      onClose();
    } catch (err) {
      console.error("Error updating category:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background-dark/30 dark:bg-background-dark/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-background-light dark:bg-background-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fadeIn"
      >
        {/* Header */}
        <div className="p-6 border-b border-background-light-darken dark:border-background-dark-lighten flex justify-between items-center">
          <h2 className="text-2xl font-bold text-background-dark dark:text-background-light">
            Edit Category
          </h2>
          <button
            onClick={onClose}
            className="text-background-dark/60 dark:text-background-light/60 hover:text-background-dark dark:hover:text-background-light transition-colors"
          >
            <IoClose size={26} />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 overflow-y-auto space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-background-dark/80 dark:text-background-light/80">
                Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background-light-darken/50 dark:bg-background-dark-lighten/10 border border-background-light-darken dark:border-background-dark-lighten text-background-dark dark:text-background-light rounded-lg focus:ring-primary focus:border-primary block p-3 transition"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-background-dark/80 dark:text-background-light/80">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-background-light-darken/50 dark:bg-background-dark-lighten/10 border border-background-light-darken dark:border-background-dark-lighten text-background-dark dark:text-background-light rounded-lg focus:ring-primary focus:border-primary block p-3 transition"
              />
            </div>
          </div>

          {/* Groups */}
          <div>
            <label className="block text-sm font-medium text-background-dark/80 dark:text-background-light/80 mb-1">
              Subcategory Groups
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. Kids"
                className="flex-1 bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/40 rounded-lg py-2 px-3 text-background-dark dark:text-background-light focus:outline-none focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={addGroup}
                className="bg-primary text-white px-4 rounded-lg hover:bg-primary/90"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <span
                  key={g.id}
                  className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {g.name}
                  <button
                    type="button"
                    onClick={() => removeGroup(g.id)}
                    className="text-primary/70 hover:text-primary/100"
                  >
                    <IoClose size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-background-light-darken/80 dark:bg-background-dark-lighten/20 text-background-dark dark:text-background-light font-bold py-2.5 px-6 rounded-lg hover:bg-background-light-darken dark:hover:bg-background-dark-lighten/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-bold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

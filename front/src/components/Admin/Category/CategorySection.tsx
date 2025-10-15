"use client";

import { useState, useEffect } from "react";
import CategoryTable from "./CategoryTable";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useSession } from "@/components/Context/SessionContext";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export type SubcategoryGroup = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  groups: SubcategoryGroup[];
};

export default function CategorySection() {
  const { token } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error("No token available");

      const res = await fetch("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Category[] = await res.json();
      setCategories(data?.length ? data : mockCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories(mockCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Handle create
  const handleCategoryCreated = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    setShowCreateModal(false);
  };

  // Handle edit
  const handleCategoryUpdated = (updated: Category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setEditCategory(null);
  };

  // Handle delete
  const handleCategoryDelete = async () => {
    if (!token || !deleteCategory) return;
    setDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/categories/${deleteCategory.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      setCategories((prev) =>
        prev.filter((c) => c.id !== deleteCategory.id)
      );
      setDeleteCategory(null);
      toast.success("Category deleted successfully");
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error("Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Categories
        </h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus className="w-5 h-5" /> Add Category
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-xl text-slate-700 dark:text-slate-300">Loading...</p>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={(c) => setEditCategory(c)}
          onDelete={(c) => setDeleteCategory(c)}
        />
      )}

      {/* Modals */}
      {showCreateModal && token && (
        <CreateCategoryModal
          token={token!}
          onClose={() => setShowCreateModal(false)}
          onCategoryCreated={handleCategoryCreated}
        />
      )}

      {editCategory && token && (
        <EditCategoryModal
          token={token!}
          category={editCategory}
          onClose={() => setEditCategory(null)}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}

      {deleteCategory && (
        <DeleteCategoryModal
          categoryName={deleteCategory.name}
          onClose={() => setDeleteCategory(null)}
          onConfirm={handleCategoryDelete}
          loading={deleting}
        />
      )}
    </div>
  );
}

// Mock categories (fallback)
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    description: "Men’s and women’s fashion",
    groups: [
      { id: "g1", name: "Men" },
      { id: "g2", name: "Women" },
      { id: "g3", name: "Kids" },
    ],
  },
  {
    id: "2",
    name: "Electronics",
    description: "Devices, accessories, and gadgets",
    groups: [
      { id: "g4", name: "Phones" },
      { id: "g5", name: "Laptops" },
      { id: "g6", name: "Audio" },
    ],
  },
];

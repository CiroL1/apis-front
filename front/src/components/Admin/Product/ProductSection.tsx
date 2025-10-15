"use client";

import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import CreateProductModal from "./ProductModal/CreateProductModal";
import EditProductModal from "./ProductModal/EditProductModal";
import ProductDetailsModal from "./ProductDetailsModal";
import { useSession } from "@/components/Context/SessionContext";
import { FiPlus } from "react-icons/fi";
import { ProductResponse } from "./types";

export default function ProductSection() {
  const { token } = useSession();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductResponse | null>(null);
  const [viewingProduct, setViewingProduct] = useState<ProductResponse | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<ProductResponse | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error("No token available");
      const res = await fetch("http://localhost:8080/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ProductResponse[] = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleProductCreated = (newProduct: ProductResponse) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowCreateModal(false);
  };

  const handleProductUpdated = (updated: ProductResponse) => {
    setProducts((prev) =>
      prev.map((p) => (p.id && updated.id && p.id === updated.id ? updated : p))
    );
    setEditProduct(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteProduct?.id || !token) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8080/api/products/${deleteProduct.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Products</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-xl text-slate-700 dark:text-slate-300">Loading...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={(p) => setEditProduct(p)}
          onView={(p) => setViewingProduct(p)}
          onDelete={(p) => setDeleteProduct(p)}
        />
      )}

      {showCreateModal && token && (
        <CreateProductModal
          token={token}
          onClose={() => setShowCreateModal(false)}
          onProductCreated={handleProductCreated}
        />
      )}

      {editProduct && token && (
        <EditProductModal
          token={token}
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}

      {viewingProduct && (
        <ProductDetailsModal
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Delete Product
            </h2>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              Are you sure you want to delete <strong>{deleteProduct.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteProduct(null)}
                className="px-4 py-2 rounded-lg border text-slate-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

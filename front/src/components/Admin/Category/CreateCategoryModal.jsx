import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";

export default function CreateCategoryModal({
  token,
  onClose,
  onCategoryCreated,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  // 🔸 Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
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

  const removeGroup = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Creating category...");

    try {
      const res = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          groups: groups.map((g) => ({ name: g.name })),
        }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      onCategoryCreated(data);

      toast.success("Category created successfully!", { id: toastId });

      setTimeout(() => onClose(), 500);
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error("Failed to create category", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-background-light dark:bg-background-dark w-full max-w-lg rounded-xl shadow-xl p-8 m-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-background-dark dark:text-background-light">
            Create New Category
          </h1>
          <button
            onClick={onClose}
            className="text-background-dark/60 dark:text-background-light/60 hover:text-background-dark dark:hover:text-background-light transition"
            title="Close"
          >
            <FiX size={22} />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-background-dark/80 dark:text-background-light/80">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Furniture"
              className="mt-1 block w-full bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/40 rounded-lg py-3 px-4 text-background-dark dark:text-background-light focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-background-dark/80 dark:text-background-light/80">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short description of this category"
              className="mt-1 block w-full bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/40 rounded-lg py-3 px-4 text-background-dark dark:text-background-light focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Subcategorías */}
          <div>
            <label className="block text-sm font-medium text-background-dark/80 dark:text-background-light/80 mb-1">
              Subcategory Groups
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. Men"
                className="flex-1 bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/40 rounded-lg py-2 px-3 text-background-dark dark:text-background-light focus:outline-none focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={addGroup}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-primary/90 transition"
              >
                <FiPlus size={16} /> Add
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
                    title="Remove group"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-background-dark/80 dark:text-background-light/80 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg text-white bg-primary hover:bg-primary/90 font-semibold shadow-md transition"
            >
              {loading ? "Creating..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
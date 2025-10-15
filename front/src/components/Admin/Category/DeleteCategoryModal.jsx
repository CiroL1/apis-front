import toast from "react-hot-toast";

export default function DeleteCategoryModal({
  categoryName,
  onClose,
  onConfirm,
  loading,
}) {
  return (
    <div className="fixed inset-0 bg-background-dark/30 dark:bg-background-dark/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background-light dark:bg-background-dark w-full max-w-md rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold text-background-dark dark:text-background-light mb-4">
          Delete Category
        </h2>
        <p className="text-background-dark/80 dark:text-background-light/80 mb-6">
          Are you sure you want to delete <strong>{categoryName}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-background-dark/80 dark:text-background-light/80 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold shadow-md"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default function ProductRow({ product, onEdit, onView, onDelete }) {
  return (
    <tr className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <th
        className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap"
        scope="row"
      >
        {product.name ?? "-"}
      </th>
      <td className="px-6 py-4">{product.category ?? "-"}</td>
      <td className="px-6 py-4">
        ${product.price !== undefined ? product.price.toFixed(2) : "-"}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onView}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="View"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={onEdit}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-700 transition-colors text-red-500"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
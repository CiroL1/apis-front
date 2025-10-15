"use client";

import { Category } from "./CategorySection";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap"
      >
        {category.name}
      </th>

      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
        {category.description || "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {category.groups.map((g) => (
            <span
              key={g.id}
              className="bg-primary/10 dark:bg-primary/20 text-primary text-xs font-semibold px-2 py-1 rounded-full"
            >
              {g.name}
            </span>
          ))}
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={onEdit}
            className="text-primary hover:text-primary/80 transition"
            title="Edit category"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 transition"
            title="Delete category"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

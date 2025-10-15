"use client";

import CategoryRow from "./CategoryRow";
import { Category } from "./CategorySection";

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: {
  categories: Category[];
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
}) {
  return (
    <div className="bg-white dark:bg-background-dark rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-3">Category Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Groups</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <CategoryRow
                key={c.id}
                category={c}
                onEdit={() => onEdit(c)}
                onDelete={() => onDelete(c)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
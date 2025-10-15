"use client";

import ProductRow from "./ProductRow";
import { ProductResponse } from "./types";

type Props = {
  products: ProductResponse[];
  onEdit: (product: ProductResponse) => void;
  onView: (product: ProductResponse) => void;
  onDelete: (product: ProductResponse) => void;
};

export default function ProductTable({ products, onEdit, onView, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-background-dark rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                onEdit={() => onEdit(p)}
                onView={() => onView(p)}
                onDelete={() => onDelete(p)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

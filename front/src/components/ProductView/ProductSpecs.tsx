"use client";

import { FullProduct } from "./ProductDetailContainer";

interface ProductSpecsProps {
  product: FullProduct;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  if (!product.specifications) return null;

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold">Specifications</h2>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {Object.entries(product.specifications).map(([key, value]) => (
          <div key={key}>
            <p className="font-medium text-gray-500">{key}</p>
            <p className="text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

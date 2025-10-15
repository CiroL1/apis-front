"use client";

import { FullProduct } from "./ProductDetailContainer";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ProductReviewsProps {
  product: FullProduct;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  if (!product.reviews || product.reviews.length === 0) return null;

  const avgRating =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold">Customer Reviews</h2>
      <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start">
        {/* Rating general */}
        <div className="flex flex-col items-center gap-2 md:w-1/4">
          <p className="text-5xl font-bold">{avgRating.toFixed(1)}</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(avgRating) ? (
                <AiFillStar key={i} className="text-primary" />
              ) : (
                <AiOutlineStar key={i} className="text-primary" />
              )
            )}
          </div>
          <p className="text-sm text-gray-500">{`Based on ${product.reviews.length} reviews`}</p>
        </div>

        {/* Reviews individuales */}
        <div className="flex-1 space-y-4">
          {product.reviews.map((r, i) => (
            <div key={i} className="flex gap-4">
              <img src={r.avatar} alt={r.user} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.user}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) =>
                      j < r.rating ? (
                        <AiFillStar key={j} className="text-primary" />
                      ) : (
                        <AiOutlineStar key={j} className="text-primary" />
                      )
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{r.date}</p>
                <p className="mt-2 text-gray-600">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

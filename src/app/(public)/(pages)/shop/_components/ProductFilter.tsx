"use client";

import { priceRanges, sortOptions } from "@/app/constant";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeMin = searchParams.get("minPrice");
  const activeMax = searchParams.get("maxPrice");
  const activeSort = searchParams.get("sort");

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // params.set("page", "1");

    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-full  bg-white border border-neutral-200 rounded-3xl p-6 md:p-3 shadow-sm space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-wide text-neutral-900">
          Refine Collection
        </h2>
        <div className="w-12 h-0.5 bg-amber-500 mt-2"></div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          Price Range (QAR)
        </p>

        {priceRanges?.map((range) => {
          const isActive =
            activeMin === String(range.minPrice) &&
            activeMax === String(range.maxPrice);

          return (
            <button
              key={range.label}
              onClick={() =>
                updateParams({
                  minPrice: String(range.minPrice),
                  maxPrice: String(range.maxPrice),
                })
              }
              className={`w-full text-left px-4 py-3 rounded-2xl border 
                transition-all duration-300 text-sm tracking-wide
                ${
                  isActive
                    ? "bg-amber-500 text-white border-amber-500"
                    : "border-neutral-200 hover:bg-amber-500 hover:text-white"
                }`}
            >
              {range.label}
            </button>
          );
        })}
      </div>
      {/* Sorting */}
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          Sort By
        </p>
        {sortOptions?.map((option) => (
          <button
            key={option.value}
            onClick={() => updateParams({ sort: option.value })}
            className={`w-full text-left px-4 py-3 rounded-2xl border 
        transition-all duration-300 text-sm tracking-wide flex items-center gap-3
        ${
          activeSort === option.value
            ? "bg-amber-500 text-white border-amber-500"
            : "border-neutral-200 hover:bg-amber-50 hover:border-amber-300 text-neutral-700"
        }`}
          >
            {/* Custom radio circle */}
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
          ${
            activeSort === option.value ? "border-white" : "border-neutral-300"
          }`}
            >
              {activeSort === option.value && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            {option.label}
          </button>
        ))}
      </div>

      {/* Clear Filter */}
      <button
        onClick={() => router.replace("/shop")}
        className="text-xs tracking-widest text-neutral-400 hover:text-black transition"
      >
        CLEAR ALL
      </button>
    </aside>
  );
};

export default ProductFilter;

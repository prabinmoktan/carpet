"use client";

const shimmer =
  "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

const ProductSpecsSkeleton = () => {
  return (
    <section className="bg-gray-100 p-4 rounded-xl">
      
      {/* Tab Header */}
      <div className="flex justify-between bg-gray-200 rounded-lg px-2 py-1">
        <div className={`h-6 w-full rounded ${shimmer}`} />
        <div className={`h-6 w-full rounded ${shimmer}`} />
        <div className={`h-6 w-full rounded ${shimmer}`} />
      </div>

      {/* Spec List */}
      <ul className="flex flex-col gap-5 px-4 pt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex justify-between border-b border-gray-200 pb-3"
          >
            <div className={`h-4 w-24 rounded ${shimmer}`} />
            <div className={`h-4 w-20 rounded ${shimmer}`} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductSpecsSkeleton;

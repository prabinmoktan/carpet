"use client";

const shimmer =
  "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

const ProductDataSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 mt-10 py-10 gap-16">
      
      {/* Image Skeleton */}
      <div className={`relative w-full aspect-square rounded-lg ${shimmer}`} />

      {/* Content Skeleton */}
      <div className="space-y-8">

        {/* Category + Sale Badge */}
        <div className="flex justify-between">
          <div className={`h-6 w-24 rounded ${shimmer}`} />
          <div className={`h-6 w-20 rounded ${shimmer}`} />
        </div>

        {/* Title */}
        <div className={`h-10 w-3/4 rounded ${shimmer}`} />

        {/* Price Row */}
        <div className="flex items-center gap-6">
          <div className={`h-8 w-32 rounded ${shimmer}`} />
          <div className={`h-6 w-24 rounded ${shimmer}`} />
          <div className={`h-6 w-20 rounded ${shimmer}`} />
        </div>

        {/* Stock Badge */}
        <div className={`h-6 w-28 rounded ${shimmer}`} />

        {/* Stock text */}
        <div className={`h-4 w-40 rounded ${shimmer}`} />

        {/* Description */}
        <div className="space-y-3">
          <div className={`h-4 w-full rounded ${shimmer}`} />
          <div className={`h-4 w-full rounded ${shimmer}`} />
          <div className={`h-4 w-5/6 rounded ${shimmer}`} />
        </div>

        {/* Size Detail */}
        <div className={`h-10 w-full rounded ${shimmer}`} />

        {/* Quantity */}
        <div className={`h-10 w-40 rounded ${shimmer}`} />

        {/* Button */}
        <div className={`h-12 w-full rounded ${shimmer}`} />
      </div>
    </section>
  );
};

export default ProductDataSkeleton;

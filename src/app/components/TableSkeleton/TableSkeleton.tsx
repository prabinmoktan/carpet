"use client";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 8,
  columns = 5,
}: TableSkeletonProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 bg-gray-100  px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-10 animate-pulse rounded bg-gray-300 "
          />
        ))}
      </div>

      {/* Body */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-5 gap-4  h-18 px-4 py-3 "
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-7 animate-pulse rounded bg-gray-200 first:h-16 first:w-12 "
            />
          ))}
        </div>
      ))}
    </div>
  );
}

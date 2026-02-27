import React from 'react'

const FilterSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 bg-neutral-100">
    <div className="h-6 w-1/2 bg-neutral-200 rounded" />
    <div className="h-10 bg-neutral-200 rounded-xl" />
    <div className="h-10 bg-neutral-200 rounded-xl" />
    <div className="h-10 bg-neutral-200 rounded-xl" />

    <div className="h-10 bg-neutral-200 rounded-xl mt-4 " />
    <div className="h-10 bg-neutral-200 rounded-xl" />
    <div className="h-10 bg-neutral-200 rounded-xl" />
  </div>
  )
}

export default FilterSkeleton
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full w-full">
      {/* Product Image */}
      <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300" />

      {/* Product Details */}
      <div className="p-6 space-y-3">
        <div className="h-8 w-2/5 bg-gray-200 rounded animate-pulse"/>

      
        {/* Title */}
        <div className="h-11 bg-gray-200 rounded-lg w-4/5 animate-pulse" />

        

        {/* Price Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 bg-gray-200 rounded w-24 animate-pulse" />
          {/* <div className="h-6 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-md w-20 flex items-center justify-center"> */}
            <div className="w-4 h-4 bg-white/20 rounded-full" />
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;

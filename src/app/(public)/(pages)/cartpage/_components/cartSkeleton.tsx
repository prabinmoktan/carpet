import React from "react";

const CartSkeleton = () => {
  return (
    <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mb-6" />

        <div className="lg:flex lg:items-start lg:gap-8">
          {/* LEFT SIDE – Cart Items */}
          <div className="w-full lg:max-w-2xl xl:max-w-4xl space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 rounded-lg  p-4 shadow-sm animate-pulse dark:border-gray-700"
              >
                {/* Image */}
                <div className="h-24 w-24 rounded bg-gray-200 dark:bg-gray-700" />

                {/* Text */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}

            <div className="h-10 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>

          {/* RIGHT SIDE – Order Summary */}
          <div className="mt-6 lg:mt-0 lg:w-full max-w-md space-y-6">
            <div className="rounded-lg  p-6 shadow-sm animate-pulse dark:border-gray-700">
              <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-6" />

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex justify-between mb-4"
                >
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}

              <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700 mt-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSkeleton;

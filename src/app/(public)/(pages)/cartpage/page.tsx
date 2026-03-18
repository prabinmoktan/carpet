"use client";
import React from "react";
import { MoveRight } from "lucide-react";
import Button from "../../ui/Button/Button";
import CartSkeleton from "./_components/cartSkeleton";
import Link from "next/link";
import CartItems from "./_components/CartItems/CartItems";
import useGuestCart from "./hooks/useGuestCart";
import useServerCart from "./hooks/useServerCart";




const Page = () => {

  const { cart, totalAmount, totalSaving, originalPrice, totalQuantity } =
    useGuestCart();

  const { items, isLoading,  clearCartItems } =
    useServerCart();

  console.log("items=>", items);
  console.log("cart from cartpage redux", cart)

  // useCartSync();

  const hasItems = cart?.length > 0 || items.length > 0;

  // if (!mounted) return <CartSkeleton />;

  if (!cart || isLoading) return <CartSkeleton />;

  return (
    <section className="bg-white pt-8 antialiased dark:bg-gray-900 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-3 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              <CartItems />
              {!hasItems && (
                  <h1>No cart items. Continue Shopping</h1>
                )}
              { hasItems && (
                  <Button
                    title={"Clear Cart"}
                    variant={"destruction"}
                    onClick={clearCartItems }
                  />
                )}
            </div>
            {hasItems && 
            <div className="hidden xl:mt-8 xl:block">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                People also bought
              </h3>
              <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                {/* product card */}
              </div>
            </div>
            }
          </div>

          {hasItems
             && (
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          QAR{originalPrice}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Savings
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          {totalSaving}
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        QAR{totalAmount}
                      </dd>
                    </dl>
                  </div>

                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      or
                    </span>
                    <Link
                      href="/shop"
                      title=""
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <MoveRight />
                    </Link>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Page;

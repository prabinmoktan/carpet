
// "use client";

import React from "react";
// import { useRouter } from "next/navigation";
import { requireUser } from "@/app/admin/lib/requireUser";
import CheckoutAuthgate from "./_components/CheckoutAuthgate";
import AppText from "../../ui/AppText/AppText";
import { Controller } from "react-hook-form";
import CheckoutForm from "./_components/CheckoutForm";

const CheckoutPage = async() => {
  // const router = useRouter();
  const user =await requireUser();
  console.log("user", user)

  if(!user)return<CheckoutAuthgate />

  return (
    <section className="min-h-screen bg-neutral-50 md:pt-16 pt-8 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* LEFT SIDE - FORM */}
        <div className="md:col-span-2 space-y-10">

          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-neutral-900">
              Secure Checkout
            </h1>
            <div className="w-16 h-0.5 bg-amber-500 mt-3"></div>
            <p className="text-neutral-500 mt-4 text-sm">
              Complete your order with confidence.
            </p>
          </div>

          {/* Contact Information */}
         

          {/* Shipping Address */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-sm">
            <h2 className="text-lg font-medium tracking-wide text-neutral-800">
              Shipping Address
            </h2>

          <CheckoutForm/>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-sm">
            <h2 className="text-lg font-medium tracking-wide text-neutral-800">
              Payment Method
            </h2>

            <div className="border border-neutral-200 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-sm text-neutral-700">Credit / Debit Card</span>
              <span className="text-xs text-neutral-400">Secure Payment</span>
            </div>

            <button
              className="w-full bg-amber-500 text-white py-4 rounded-2xl text-sm tracking-widest hover:bg-amber-600 transition"
            >
              COMPLETE ORDER
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm h-fit sticky top-10 space-y-6">

          <h2 className="text-lg font-medium tracking-wide text-neutral-800">
            Order Summary
          </h2>

          {/* Example Product */}
          <div className="flex gap-4">
            <div className="w-20 aspect-[2/3] bg-neutral-200 rounded-xl"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">
                Premium Wool Prayer Mat
              </p>
              <p className="text-xs text-neutral-500">Handcrafted Collection</p>
              <p className="text-sm mt-2 text-neutral-900 font-medium">
                QAR 4,500
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>QAR 4,500</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-neutral-900 pt-2">
              <span>Total</span>
              <span>QAR 4,500</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
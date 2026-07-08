// "use client";

import React from "react";
// import { useRouter } from "next/navigation";
import { requireUser } from "@/app/admin/lib/requireUser";
import CheckoutAuthgate from "./_components/CheckoutAuthgate";

import CheckoutForm from "./_components/CheckoutForm";
import CheckoutCart from "./_components/CheckoutCart";

import Link from "next/link";
import PaymentMethodSection from "./_components/PaymentMethodSection";
import Button from "../../ui/Button/Button";

const CheckoutPage = async () => {
  // const router = useRouter();
  const user = await requireUser();
  console.log("user", user);

  if (!user) return <CheckoutAuthgate />;

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

            <CheckoutForm />
            
          </div>
          <div className="mt-6 space-y-6 shadow-sm p-6 bg-white rounded-3xl border border-neutral-200">
        

        <PaymentMethodSection />

       <Button
         title={"COMPLETE ORDER"}
         variant={"primary"}
         type="submit"
         className="w-full  text-white py-4 rounded-2xl text-sm tracking-widest transition"
       />
     </div>
          
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm h-fit sticky top-10 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium tracking-wide text-neutral-800">
              In Your Cart
            </h2>
            <Link
              href={"/cartpage"}
              className="text-sm   text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer"
            >
              Edit
              <span className="absolute bottom-0 text-gray-500 left-0 w-0 h-px bg-gray-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Example Product */}
          <CheckoutCart />
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

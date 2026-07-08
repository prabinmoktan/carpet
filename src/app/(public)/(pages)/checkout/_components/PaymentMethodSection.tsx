"use client";

import AppText from "@/app/(public)/ui/AppText/AppText";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const METHODS = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function PaymentMethodSection() {
  const [method, setMethod] = useState("card");
  const {control} = useForm()

  return (
    <div className="">
      <div className="w-full max-w-5xl grid grid-cols-1  gap-6">
        {/* LEFT - FORM */}
        <div className=" rounded-2xl  space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Checkout</h2>
            <p className="text-sm text-gray-500">Secure payment experience</p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            {METHODS.map((m) => {
              const active = method === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    active
                      ? "border-amber-500 "
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          active ? "border-amber-500" : "border-gray-300"
                        }`}
                      >
                        {active && (
                          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                        )}
                      </div>
                      <span className="font-medium text-sm">{m.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">Secure</span>
                  </div>

                  {/* EXPAND */}
                  {active && m.id === "card" && (
                    <div className="mt-4 space-y-3">
                      <Controller
                        control={control}
                        name="cardNumber"
                        render={({ field }) => (
                          <AppText
                            label={"Card number"}
                            className={""}
                            {...field}
                          />
                        )}
                      />
                     
                      <div className="grid grid-cols-2 gap-x-8">
                      <Controller
                        control={control}
                        name="cardDate"
                        render={({ field }) => (
                          <AppText
                            label={"MM/YY"}
                            className={""}
                            {...field}
                          />
                        )}
                      />
                         <Controller
                        control={control}
                        name="cvv"
                        render={({ field }) => (
                          <AppText
                            label={"CVV"}
                            className={""}
                            {...field}
                          />
                        )}
                      />
                      </div>
                      <Controller
                        control={control}
                        name="cardName"
                        render={({ field }) => (
                          <AppText
                            label={"Name on card"}
                            className={""}
                            {...field}
                          />
                        )}
                      />

                    </div>
                  )}

                  {active && m.id === "stripe" && (
                    <div className="mt-4 text-sm text-gray-500">
                      Stripe secure checkout will be initialized here.
                    </div>
                  )}

                  {active && m.id === "paypal" && (
                    <div className="mt-4 text-sm text-gray-500">
                      You will be redirected to PayPal.
                    </div>
                  )}

                  {active && m.id === "cod" && (
                    <div className="mt-4 text-sm text-gray-500">
                      Pay with cash upon delivery.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

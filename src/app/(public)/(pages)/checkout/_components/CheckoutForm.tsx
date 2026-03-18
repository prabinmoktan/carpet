"use client";
import AppText from "@/app/(public)/ui/AppText/AppText";
import { checkoutDefaultValues } from "@/app/admin/AdminDefaultValues";
import { CheckoutFormValues, checkoutSchemaRefined } from "@/app/admin/AdminSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const CheckoutForm = () => {
  const { control, handleSubmit, formState: {errors} } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchemaRefined),
    defaultValues: checkoutDefaultValues
  });
  const onSubmit = async(data: CheckoutFormValues) => {
    console.log(data, data)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-sm">
          <h2 className="text-lg font-medium tracking-wide text-neutral-800">
            Contact Information
          </h2>
          <Controller
            name="contact.email"
            control={control}
            render={({ field }) => (
              <AppText label={"Email"} className={""} {...field} />
            )}
          />
           <Controller
            name="contact.phone"
            control={control}
            render={({ field }) => (
              <AppText label={"Mobile Number"} className={""} {...field} />
            )}
          />
         

         
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Controller
            name="contact.firstName"
            control={control}
            render={({ field }) => (
              <AppText label={"First Name"} className={""} {...field} />
            )}
          />
          <Controller
            name="contact.lastName"
            control={control}
            render={({ field }) => (
              <AppText label={"Last Name"} className={""} {...field} />
            )}
          />
        </div>

        <Controller
          name="shipping.addressLine1"
          control={control}
          render={({ field }) => (
            <AppText label={"Street Address"} className={""} {...field} />
          )}
        />

        <div className="grid md:grid-cols-3 gap-6">
          <Controller
            name="shipping.city"
            control={control}
            render={({ field }) => (
              <AppText label={"City"} className={""} {...field} />
            )}
          />
          <Controller
            name="shipping.state"
            control={control}
            render={({ field }) => (
              <AppText label={"State"} className={""} {...field} />
            )}
          />

          <Controller
            name="shipping.zip"
            control={control}
            render={({ field }) => (
              <AppText label={"Postal Code"} className={""} {...field} />
            )}
          />
           <Controller
          name="shipping.country"
          control={control}
          render={({ field }) => (
            <AppText
              label="Country"
              className=""
              error={errors.shipping?.country?.message}
              {...field}
            />
          )}
        />
      </div>
      
      </form>
    </>
  );
};

export default CheckoutForm;

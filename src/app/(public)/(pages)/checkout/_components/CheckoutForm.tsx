"use client";
import AppText from "@/app/(public)/ui/AppText/AppText";
import Button from "@/app/(public)/ui/Button/Button";
import { checkoutDefaultValues } from "@/app/admin/AdminDefaultValues";
import { CheckoutFormValues, checkoutSchema } from "@/app/admin/AdminSchemas";
import AdminSelectInput from "@/app/admin/AdminUi/AdminSelectInput";
import { COUNTRIES } from "@/app/constant";
import { selectUser } from "@/app/redux/slice/auth/auth.selector";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import PaymentMethodSection from "./PaymentMethodSection";

const CheckoutForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkoutDefaultValues,
  });
  const user = useSelector(selectUser);
  console.log(user)
  const onSubmit = async (data: CheckoutFormValues) => {
    console.log(data, data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid gap-y-6">

       
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-sm ">
          <h2 className="text-lg font-medium tracking-wide text-neutral-800">
            Contact Information
          </h2>
          <Controller
            name="contact.email"
            control={control}
            render={({ field }) => (
              <AppText
                label={"Email"}
                className={""}
                error={errors?.contact?.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="contact.phone"
            control={control}
            render={({ field }) => (
              <AppText
                label={"Mobile Number"}
                className={""}
                error={errors?.contact?.phone?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 ">
          <Controller
            name="contact.firstName"
            control={control}
            render={({ field }) => (
              <AppText
                label={"First Name"}
                className={""}
                error={errors?.contact?.firstName?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="contact.lastName"
            control={control}
            render={({ field }) => (
              <AppText
                label={"Last Name"}
                className={""}
                error={errors?.contact?.lastName?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="shipping.addressLine1"
          control={control}
          render={({ field }) => (
            <AppText
              label={"Street Address 1"}
              className={""}
              error={errors?.shipping?.addressLine1?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="shipping.addressLine2"
          control={control}
          render={({ field }) => (
            <AppText
              label={"Street Address 2(optional)"}
              className={""}
              error={errors?.shipping?.addressLine2?.message}
              {...field}
            />
          )}
        />

        <div className="grid md:grid-cols-3 gap-6 ">
          <Controller
            name="shipping.city"
            control={control}
            render={({ field }) => (
              <AppText
                label={"City"}
                className={""}
                error={errors?.shipping?.city?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="shipping.state"
            control={control}
            render={({ field }) => (
              <AppText
                label={"State"}
                className={""}
                error={errors?.shipping?.state?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="shipping.zip"
            control={control}
            render={({ field }) => (
              <AppText
                label={"Postal Code"}
                className={""}
                error={errors?.shipping?.zip?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="shipping.country"
            control={control}
            render={({ field }) => (
              <AdminSelectInput
                label="Country"
                options={COUNTRIES}
                className=""
                error={errors.shipping?.country?.message}
                {...field}
              />
            )}
          />
        </div>
        </div>
        {/* Payment Section */}
     
      </form>
    </>
  );
};

export default CheckoutForm;

"use client";
import Button from "@/app/(public)/ui/Button/Button";
import AdminInputField from "@/app/admin/AdminUi/AdminInputField/AdminInputField";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller  } from "react-hook-form";
import company from "../../../../public/logo.png";

import { UseRegisterForm } from "./hooks/UseRegisterForm";

const Page = () => {
  const { onSubmit, methods } = UseRegisterForm();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <form
          action=""
          onSubmit={onSubmit}
          className="space-y-4 border px-2 py-4"
        >
          <div className="flex justify-center flex-col">
            <div className="w-full flex justify-center">
              <Image src={company} height={50} width={50} alt="company-logo" />
            </div>
            <div className="font-cinzel font-light   text-logo  uppercase leading-none! text-center">
              <span className="tracking-tight text-4xl">S</span>
              <span className="text-3xl">anaa yadawiya</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <AdminInputField
                  label={"First Name"}
                  error={errors.firstName?.message}
                  className={""}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <AdminInputField
                  label={"Last Name"}
                  className={""}
                  error={errors.lastName?.message}
                  {...field}
                />
              )}
            />{" "}
          </div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <AdminInputField
                label={"Email"}
                className={""}
                error={errors.email?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <AdminInputField
                type="password"
                label={"Password"}
                className={""}
                error={errors.password?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <AdminInputField
                type="password"
                label={"confirm Password"}
                error={errors.confirmPassword?.message}
                className={""}
                {...field}
              />
            )}
          />
          <Button
            title={"Register"}
            variant={"primary"}
            type="submit"
            className="w-full flex justify-center"
          />
          <p className="text-sm">
            Already have an account?{" "}
            <Link href={"/login"} className="underline hover:scale-105">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Page;

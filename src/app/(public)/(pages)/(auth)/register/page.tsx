"use client";
import Button from "@/app/(public)/ui/Button/Button";
import AdminInputField from "@/app/admin/AdminUi/AdminInputField/AdminInputField";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller } from "react-hook-form";
import company from "../../../../../../public/loginbg.png"
import { UseRegisterForm } from "./hooks/UseRegisterForm";
import CompanyLogo from "@/app/(public)/ui/CompanyLogo/CompanyLogo";

const Page = () => {
 

  const {
    handleSubmit,
    control, 
    errors 
  } = UseRegisterForm();

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border px-2 py-4"
        >
          <div className="flex justify-center flex-col">
          
            <CompanyLogo/>
          </div>
          <div className="flex gap-4">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <AdminInputField
                  type="text"
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
                  type="text"
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
                type="text"
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

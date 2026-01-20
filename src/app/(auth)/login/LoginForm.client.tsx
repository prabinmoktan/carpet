"use client";
import React from "react";
import style from "./style.module.css";
import Image from "next/image";

import google from "../../../../public/google.png";
import AdminInputField from "@/app/admin/AdminUi/AdminInputField/AdminInputField";
import { Controller, useForm } from "react-hook-form";
import Button from "@/app/(public)/ui/Button/Button";
import { LoginPageTypes } from "@/app/admin/AdminType";
import company from "../../../../public/logo.png";
import Link from "next/link";
import { UserLoginDefaultValues } from "@/app/admin/AdminDefaultValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from "@/app/admin/AdminSchemas";
import { UseLoginForm } from "./hooks/UseLoginForm";

export default function LoginForm() {
  const {onsubmit, methods} = UseLoginForm();
  const {
    control,
    formState: { errors },
  } = methods;
  return (
    <>
      <div className={`${style.mainDiv} `}>
        <div className="w-1/4  bg-black/40 backdrop-blur-xs rounded-xl shadow-md border border-white/60 text-white px-10 cursor-pointer space-y-6 py-4">
          <form onSubmit={onsubmit} className="space-y-2">
            <div className="flex justify-center flex-col">
              <div className="w-full flex justify-center">
                <Image
                  src={company}
                  height={50}
                  width={50}
                  alt="company-logo"
                />
              </div>
              <div className="font-cinzel font-light   text-logo  uppercase leading-none! text-center">
                <span className="tracking-tight text-4xl">S</span>
                <span className="text-3xl">anaa yadawiya</span>
              </div>
            </div>
            <h1 className="text-xs capitalize">
              welcome. please login to cointinue
            </h1>
            <div className="flex flex-col justify-center gap-4">
              <Button
                firstIcon={
                  <Image
                    src={google}
                    alt="google-logo"
                    height={18}
                    width={18}
                  />
                }
                title="login with google"
                variant={"glass"}
                className="bg-white/60 w-full flex gap-4 justify-center"
              />

              <div className="flex items-center">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-sm font-medium  tracking-wide">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="space-y-6">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <AdminInputField
                    type="text"
                      label={"Email"}
                      error={errors.email?.message}
                      className={""}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <AdminInputField
                      label={"Password"}
                      type="password"
                      error={errors.password?.message}
                      className={""}
                      {...field}
                    />
                  )}
                />
                <Button
                  title={"Login"}
                  variant={"primary"}
                  type="submit"
                  className="w-full flex justify-center"
                />
              </div>
            </div>
          </form>
          <div>
            <p className="text-sm">
              Dont have an account?{" "}
              <Link href={"/register"} className="underline hover:scale-105">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

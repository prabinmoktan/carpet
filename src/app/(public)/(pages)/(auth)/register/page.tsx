"use client";
import Button from "@/app/(public)/ui/Button/Button";
import AdminInputField from "@/app/admin/AdminUi/AdminInputField/AdminInputField";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import company from "../../../../public/logo.png";

import { UserRegisterDefaultvalues } from "@/app/admin/AdminDefaultValues";
import { RegisterSchemaWithConfirm } from "@/app/admin/AdminSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegsiterTypes } from "@/app/admin/AdminType";
import { registerUser } from "@/app/services/register.axios.service";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  // const { onSubmit, methods } = UseRegisterForm();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: UserRegisterDefaultvalues,
    resolver: zodResolver(RegisterSchemaWithConfirm),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegsiterTypes) => {
  

    try {
      const response = await registerUser(data);
 

      if (response.data?.message) {
        toast.success(response.data?.message, { position: "bottom-right", 
        
          icon: <Check />
         });
      }
      router.push('/')

      reset();
    } catch (error: unknown ) {
      // console.log("error==>", error);
      // toast(error.response.data.message, { position: "bottom-right", type: "error", icon: <X /> });
      if (error && typeof error === 'object' && 'response' in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((error as any).response.data.message, {
          position: "bottom-right",
          duration: 5000
        })
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
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

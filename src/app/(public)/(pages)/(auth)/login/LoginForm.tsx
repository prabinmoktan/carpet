"use client";
import React from "react";
import style from "./style.module.css";

import AdminInputField from "@/app/admin/AdminUi/AdminInputField/AdminInputField";
import { Controller } from "react-hook-form";
import Button from "@/app/(public)/ui/Button/Button";



import { UseLoginForm } from "./hooks/UseLoginForm";
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";



export default function LoginForm() {



const {control, submitHandler, errors} = UseLoginForm();

 
 
  return (
    <>
      <div className={`${style.mainDiv} `}>
        <div className="w-1/4  bg-black/40 backdrop-blur-xs rounded-xl shadow-md border border-white/60 text-white px-10 cursor-pointer space-y-6 py-4">
          <form onSubmit={submitHandler} className="space-y-2">
            <LoginHeader/>
           
             

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
           
          </form>
         <LoginFooter/>
        </div>
       
      </div>
    </>
  );
}

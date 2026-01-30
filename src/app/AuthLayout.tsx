"use client";
import React from "react";
import { useMeQuery } from "./(public)/(pages)/(auth)/auth.api";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const {isLoading} = useMeQuery();

    if(isLoading)return <h1>Loading....</h1>
 
  return <>{children}</>;
};

export default AuthLayout;

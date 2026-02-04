"use client";
import React from "react";
import { useMeQuery } from "./(public)/(pages)/(auth)/auth.api";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
 
  const {data, isLoading} = useMeQuery();
 
  return <>{children}</>;
};

export default AuthLayout;

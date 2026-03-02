"use client";
import React, { useEffect } from "react";
import { useMeQuery } from "./(public)/(pages)/(auth)/auth.api";
import { useDispatch } from "react-redux";
import {
  clearUser,
  setAuthLoading,
  setUser,
} from "./redux/slice/auth/auth.slice";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useMeQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthLoading(isLoading));
    if (data?.user) {
      dispatch(setUser(data?.user));
    } else {
      dispatch(clearUser());
    }
  }, [data, isLoading, isError, dispatch]);

  return <>{children}</>;
};

export default AuthLayout;

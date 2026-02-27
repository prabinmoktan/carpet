'use client'
import { useLogoutUserMutation } from "@/app/(public)/(pages)/(auth)/auth.api";
import { showError, showSuccess } from "@/app/services/toastService";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const [ logoutUser, {isLoading} ]= useLogoutUserMutation();
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      showSuccess("Logged out successfully")
      router.replace('/')

    } catch (error) {
     showError("Failed to Logout. Please try again.")
    }
  };

  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;

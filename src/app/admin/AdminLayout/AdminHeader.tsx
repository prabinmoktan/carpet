"use client";
// import { useMeQuery } from "@/app/(public)/(pages)/(auth)/auth.api";
import CompanyLogo from "@/app/(public)/ui/CompanyLogo/CompanyLogo";
import { UserAvatar } from "@/app/components/UserAvatar/UserAvatar";
import { isAuthLoading, selectUser } from "@/app/redux/slice/auth/auth.selector";

import { Bell } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import AdminHeaderSkeleton from "./AdminHeaderSkeleton";

const AdminHeader = () => {
  const userData = useSelector(selectUser);
  const authLoading = useSelector(isAuthLoading);
  if (authLoading) {
    return <AdminHeaderSkeleton />;
  }
  return (
    <header className="border-b border-[#E6DED3] px-2 flex justify-between ">
      <CompanyLogo />

      <div className="flex items-center gap-8">
        <Bell />

        <div className="capitalize flex gap-4">
          <UserAvatar
            firstName={userData?.firstName}
            lastName={userData?.lastName || "A"}
            className="bg-amber-500"
          />
          <span>
            <h1>
              {userData?.firstName} {userData?.lastName}
            </h1>
            <p className="text-xs">{userData?.role}</p>
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

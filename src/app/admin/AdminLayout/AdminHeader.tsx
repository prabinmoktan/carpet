"use client";
import { useMeQuery } from "@/app/(public)/(pages)/(auth)/auth.api";
import CompanyLogo from "@/app/(public)/ui/CompanyLogo/CompanyLogo";
import { UserAvatar } from "@/app/components/UserAvatar/UserAvatar";
import { Bell } from "lucide-react";
import React from "react";

const AdminHeader = () => {
  const { data, isLoading } = useMeQuery();
  const person = data?.user;
  //  console.log(user?.email)

  return (
    <header className="border-b border-[#E6DED3] px-2 flex justify-between ">
      <CompanyLogo />

      <div className="flex items-center gap-8">
        <Bell />

        <div className="capitalize flex gap-4">
          <UserAvatar
            firstName={person?.firstName}
            lastName={person?.lastName}
            className="bg-amber-500"
          />
          <span>
          <h1>
                  {person?.firstName} {person?.lastName}
                </h1>
                <p className="text-xs">{person?.role}</p>
           
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

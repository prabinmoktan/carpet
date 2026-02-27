// "use client";
// import { useMeQuery } from "@/app/(public)/(pages)/(auth)/auth.api";
import CompanyLogo from "@/app/(public)/ui/CompanyLogo/CompanyLogo";
import { UserAvatar } from "@/app/components/UserAvatar/UserAvatar";
import { Bell } from "lucide-react";
import React from "react";

const AdminHeader = ({user}: {user:{firstName: string, lastName: string, role: string}}) => {
  
console.log("user from admin side header==> ", user)

  return (
    <header className="border-b border-[#E6DED3] px-2 flex justify-between ">
      <CompanyLogo />

      <div className="flex items-center gap-8">
        <Bell />

        <div className="capitalize flex gap-4">
          <UserAvatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            className="bg-amber-500"
          />
          <span>
          <h1>
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-xs">{user?.role}</p>
           
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

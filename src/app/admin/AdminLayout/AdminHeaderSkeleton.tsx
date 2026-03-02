"use client";
import CompanyLogo from "@/app/(public)/ui/CompanyLogo/CompanyLogo";
import { UserAvatar } from "@/app/components/UserAvatar/UserAvatar";
import { user } from "@/app/redux/slice/auth/auth.selector";
import { Bell } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const SkeletonPulse = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const AdminHeaderSkeleton = () => (
  <header className="border-b border-[#E6DED3] px-2 flex justify-between items-center h-14">
    <SkeletonPulse className="w-32 h-8" />
    <div className="flex items-center gap-8">
      <SkeletonPulse className="w-5 h-5 rounded-full" />
      <div className="flex gap-4 items-center">
        <SkeletonPulse className="w-9 h-9 rounded-full" />
        <div className="flex flex-col gap-1">
          <SkeletonPulse className="w-24 h-4" />
          <SkeletonPulse className="w-16 h-3" />
        </div>
      </div>
    </div>
  </header>
);

export default AdminHeaderSkeleton;
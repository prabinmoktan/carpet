"use client";
// import { useMeQuery } from "@/app/(public)/(pages)/(auth)/auth.api";
import CompanyLogo from "@/app/(public)/ui/CompanyLogo/CompanyLogo";
import { UserAvatar } from "@/app/components/UserAvatar/UserAvatar";
import { isAuthLoading, selectUser } from "@/app/redux/slice/auth/auth.selector";

import { Bell, ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminHeaderSkeleton from "./AdminHeaderSkeleton";
import { SidebarItem } from "@/app/constant";

const AdminHeader = () => {
  const userData = useSelector(selectUser);
  // const {page, setPage} = useState('dashboard');
  const authLoading = useSelector(isAuthLoading);
  if (authLoading) {
    return <AdminHeaderSkeleton />;
  }

  // const pageTitle = SidebarItem?.find((n)=> n.name === page)
  return (
   
     <header className="flex items-center justify-between px-8 border-b border-gray-300 py-4" >
              <div>
                <div className="text-[21px] dash-muted uppercase tracking-wide mb-0.5">
                  {/* <CompanyLogo/> */}
                  <h1>Sanaa Yadawiyaa</h1>
                </div>
                {/* <h1 className="text-xl font-semibold" style={{ fontFamily: "Fraunces, serif" }}>{pageTitle}</h1> */}
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg dash-card" style={{ minWidth: 220 }}>
                  <Search size={15} color="#8A7E6E" />
                  <input
                    placeholder="Search orders, products, customers…"
                    className="text-sm bg-transparent outline-none w-full placeholder:text-[#B3A891]"
                  />
                </div>
                <button className="w-9 h-9 rounded-lg dash-card flex items-center justify-center relative">
                  <Bell size={16} color="#8C4A2F" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#B5542E" }} />
                </button>
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: "#8C4A2F", color: "#FBF5EC" }}>
                    RS
                  </div>
                  <ChevronDown size={14} className="dash-muted" />
                </div>
              </div>
            </header>
  );
};

export default AdminHeader;

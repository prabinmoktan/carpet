"use client";
import Logout from "@/app/components/Logout/Logout";
import { SidebarItem } from "@/app/constant";
import Image from "next/image";
// import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import logo from "../../../../public/logo.png";
import Link from "next/link";

const inventory = [
  {
    name: "Everest Diamond Weave",
    category: "Hand-Knotted",
    stock: 34,
    reorder: 15,
  },
  {
    name: "Kathmandu Valley Medallion",
    category: "Hand-Knotted",
    stock: 9,
    reorder: 15,
  },
  { name: "Tibetan Wool Runner", category: "Runner", stock: 52, reorder: 20 },
  {
    name: "Pashmina Silk Blend",
    category: "Silk Blend",
    stock: 6,
    reorder: 10,
  },
  {
    name: "Thimi Traditional Knot",
    category: "Hand-Knotted",
    stock: 21,
    reorder: 15,
  },
  { name: "Lotus Trellis Tufted", category: "Tufted", stock: 3, reorder: 12 },
  {
    name: "Dhaka Weave Hallway Runner",
    category: "Runner",
    stock: 40,
    reorder: 15,
  },
];

function WeaveStrip({ height = 8, opacity = 1 }) {
  return (
    <svg
      width="100%"
      height={height}
      style={{ display: "block", opacity }}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="weavePattern"
          width="16"
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <rect width="8" height={height} fill="#B5542E" />
          <rect x="8" width="8" height={height} fill="#8C4A2F" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#weavePattern)" />
    </svg>
  );
}
const Sidebar = () => {
  const pathname = usePathname();
  const [page, setPage] = useState("overview");
  const route = useRouter();

  const lowStock = inventory?.filter((i) => i.stock <= i.reorder);

  return (
    <>
     
      <aside
        className="dash-sidebar w-60 shrink-0 flex flex-col py-6 min-h-screen h-screen"
        style={{ color: "#EDE3D2" }}
      >
        <div className="px-6 flex items-center gap-3 mb-8">
          <div
            className="w-10 h-12 rounded-md overflow-hidden shrink-0"
            // style={{ border: "1px solid #4A3626" }}
          >
            {/* <WeaveStrip height={36} /> */}
            <Image src={logo} alt={"logo"} width={36} height={45} />
          </div>
          <div>
            <div
              className="font-semibold text-sm tracking-wide"
              style={{ fontFamily: "Fraunces, serif", color: "#FBF5EC" }}
            >
              Sanaa Yadawiya
            </div>
            <div className="text-[11px]" style={{ color: "#A7987F" }}>
              Admin Console
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {SidebarItem?.map(({ name, href, icon: Icon }) => (
            <Link
              href={href}
              key={name}
              className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                page === name ? "active" : ""
              }`}
              style={{ color: page === name ? "#FBF5EC" : "#C9BBA3" }}
            >
              <Icon size={17} />
              {name}
            </Link>
            
          ))}
        </nav>

        <div
          className="mt-auto mx-3 px-4 py-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="text-xs font-medium mb-1"
            style={{ color: "#EDE3D2" }}
          >
            Low stock alert
          </div>
          <div className="text-[12px]" style={{ color: "#A7987F" }}>
            {lowStock?.length} products need reordering
          </div>
        </div>
        <div className="flex justify-center ">
          <button className="capitalize bg-amber-800 px-10 py-2 absolute bottom-20 rounded-xl  hover:bg-pink-700">
            <Logout />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

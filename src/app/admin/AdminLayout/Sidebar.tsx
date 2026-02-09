"use client";
import { SidebarItem } from "@/app/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className="min-h-screen w-full  text-white flex flex-col relative  gap-10 bg-[#F8F2E9] border-r border-[#E6DED3]">
        <nav className="space-y-2">
          {SidebarItem?.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center capitalize gap-3 hover:bg-logo/20 p-3 duration-300 rounded-md hover:shadow-2xl text-[#1F1F1F] ${isActive ? "bg-amber-500" : ""}`}
              >
                <span>{<item.icon size={18} />}</span>
                <p>{item.name}</p>
              </Link>
            );
          })}
        </nav>
        <div className="flex justify-center ">
          <button className="capitalize bg-pink-600 px-10 py-2 absolute bottom-20 rounded-xl  hover:bg-pink-700">
            log out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import { aboutFooter, shopFooter } from "@/app/constant";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-screen max-w-[1500px] text-gray-500 font-light capitalize px-10 md:py-12 py-6 bg-zinc-100">
        <footer className="grid md:grid-cols-3 grid-cols-2 border-b py-10">
        <div className="flex flex-col gap-3 justify-center">
          <h1 className="text-4xl uppercase">Company Name</h1>
          <p className=" tracking-wide text-sm">
            Curating the world&apos;s finest handcrafted carpets and rugs
          </p>
        </div>

        <div className="flex flex-col  gap-10 ">
          <h1>SHOP</h1>
          <div className="flex flex-col gap-2">
            {shopFooter &&
              shopFooter?.map((foot) => (
                <Link href={foot.link} key={foot.id}>
                  {foot.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="uppercase">about</h1>
          <div className="flex flex-col gap-2">
            {aboutFooter?.map((foot) => (
              <Link href={foot.link} key={foot.id}>
                {foot.name}
              </Link>
            ))}
          </div>
        </div>
        </footer>
       
        <div className="flex justify-between items-center h-10">
          <p className="text-sm">
          © 2024 Luxe Rugs. All rights reserved.
          </p>
          <div className="flex text-sm gap-10 text-black/70 font-light">
<Facebook className="font-light" size={'16px'}/>
<Instagram size={'16px'}/>
<Twitter size={'16px'}/>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;

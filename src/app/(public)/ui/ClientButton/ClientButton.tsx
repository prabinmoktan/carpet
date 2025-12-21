'use client'
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface ButtonTypes {
  title: string;
  variant: "default" | "primary" | "destruction" | "glass";
  className?: string;
  firstIcon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const buttonVariant = {
  default: "px-3 py-1 bg-gray-500 text-white cursor-pointer hover:bg-gray-600",
  primary: "px-3 py-2 bg-amber-700 text-white cursor-pointer rounded-md active:bg-amber-700 hover:bg-amber-800 transition-easeOut duration-300 flex gap-3 border-none",
  destruction: "px-3 py-1 bg-red-500 text-white cursor-pointer",
  glass:
    "bg-black/5 backdrop-blur-xs rounded-xl shadow-md border border-white/10 text-white px-10 py-2 cursor-pointer",
};

const ClientButton: React.FC<ButtonTypes> = ({
  title,
  variant = "default",
  firstIcon,
  secondIcon,
  

  className,

}) => {
    const route = useRouter();
  return (
    <>
      <button className={clsx(buttonVariant[variant], className)} onClick={()=>route.push(`/inspiration`)}>
        {firstIcon && firstIcon}
        <p className="capitalize">{title}</p>
        {secondIcon && secondIcon}
      </button>
    </>
  );
};

export default ClientButton;

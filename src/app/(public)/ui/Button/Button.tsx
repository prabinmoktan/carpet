import clsx from "clsx";
import React from "react";

interface ButtonTypes {
  title: string;
  variant: "default" | "primary" | "destruction" | "glass";
  className?: string;
}

const buttonVariant = {
  default: "px-3 py-1 bg-gray-500 text-white cursor-pointer hover:bg-gray-600",
  primary: "px-3 py-1 bg-blue-500 text-white cursor-pointer",
  destruction: "px-3 py-1 bg-red-500 text-white cursor-pointer",
  glass:
    "bg-black/5 backdrop-blur-xs rounded-xl shadow-md border border-white/10 text-white px-10 py-2 cursor-pointer",
};

const Button: React.FC<ButtonTypes> = ({
  title,
  variant = "default",
  className,
}) => {
  return (
    <>
      <button className={clsx(buttonVariant[variant], className)}>
        {title}
      </button>
    </>
  );
};

export default Button;

import clsx from "clsx";
import React from "react";

interface ButtonTypes {
  title: string;
  variant: "default" | "primary" | "destruction" | "glass";
  className?: string;
  firstIcon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit";
  isLoading?: boolean;
  disabled?: boolean;
 
}

const buttonVariant = {
  default: "px-3 py-1 bg-gray-500 text-white cursor-pointer hover:bg-gray-600 rounded-md" ,
  primary:
    "px-3 py-2 bg-amber-500 text-white cursor-pointer rounded-md active:bg-amber-700 hover:bg-amber-600 transition-easeOut duration-300 flex gap-3 border-none",
  destruction: "px-3 py-1 bg-red-500 text-white cursor-pointer rounded-md",
  glass:
    "bg-black/5 backdrop-blur-xs rounded-md shadow-md border border-white/10  px-10 py-2 cursor-pointer text-white",
};

const Button: React.FC<ButtonTypes> = ({
  title,
  variant = "default",
  firstIcon,
  secondIcon,
  onClick,
  isLoading=false,
  disabled,
  type = "submit",
  className,
}) => {
 
  return (
    <>
      <button
      disabled={disabled}
        className={clsx(
          buttonVariant[variant],
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        onClick={onClick}
        type={type}
      >
        {firstIcon && firstIcon}
        <p className="capitalize">{isLoading ? "Processing" : title}</p>
        {secondIcon && secondIcon}
      </button>
    </>
  );
};

export default Button;

import React, { forwardRef } from "react";

import { category } from "@/app/constant";

interface SelectTypes {
  id?: string;
  value?: string;

  name: string;
  label: string;
  options?: { name: string; id: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  className?: string; // ✅ Added for flexibility
}

const AdminSelectInput = forwardRef<HTMLSelectElement, SelectTypes>(
  (
    {
      label,

      id,
      value,
      name, // ✅ Missing from destructuring
      onChange,
      error,
      className, // ✅ Added
      ...rest
    },
    ref
  ) => {
    const combinedOptions = [
      { name: "Select option", id: "none" },
      ...category,
    ]; // ✅ Better label

    return (
      <div className={className}>
        <label className="text-sm font-medium dark:text-gray-200">
          {label}
        </label>
        <select
          id={id}
          name={name} // ✅ Added name prop
          value={value}
          onChange={onChange}
          ref={ref}
          className={`flex h-9 w-full rounded-md border ${
            error ? "border-red-500" : "border"
          }  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
            error ? "ring-red-500" : "ring-amber-500"
          }`}
          {...rest}
        >
          {combinedOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
             
            >
            
              {/* ✅ Use id as value */}
              {option.name}
            </option>
          ))}
        </select>
        {error && (
          <span className="flex items-center gap-1 text-xs font-medium text-red-500">
            ⚠ {error}
          </span>
        )}
      </div>
    );
  }
);

AdminSelectInput.displayName = "AdminSelectInput"; // ✅ Added displayName

export default AdminSelectInput;

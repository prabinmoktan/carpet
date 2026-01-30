import { EyeClosedIcon, EyeIcon } from "lucide-react";
import React, { FocusEventHandler, useState } from "react";

interface AppTextTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  className: string;
  value?: string | number;
  error?: string;
  type?: "text" | "password" | "date";
  backendError?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const AdminInputField = React.forwardRef<HTMLInputElement, AppTextTypes>(
  (
    {
      label,
      placeholder,
      className,
      value,
      error,
      type = "text",
      backendError,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <>
        <div className={className}>
          <label className="text-sm font-light">{label}</label>
          {(type === "text" || type === "date") && (
            <input
              type={type}
              ref={ref}
              placeholder={placeholder || backendError}
              value={value}
              onBlur={onBlur}
              className={`flex h-9 w-full rounded-md border ${
                error ? "border-red-500" : "border"
              }  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                error ? "ring-red-500" : "ring-amber-500"
              }`}
              {...rest}
            />
            
          )}
          {type === "password" && (
            <div
              className={`flex h-9 w-full rounded-md border ${
                error ? "border-red-500" : "border"
              }  px-3 py-2 text-base ring-offset-background focus-within:ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-within:ring-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                error ? "ring-red-500" : "ring-amber-500"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                ref={ref}
                placeholder={placeholder || backendError}
                value={value}
                autoComplete="off"
                className={` w-full text-sm 
               placeholder:text-gray-400
              focus-visible:outline-none focus-visible:ring-0
              focus-visible:ring-offset-none disabled:cursor-not-allowed 
              disabled:opacity-50 transition-all duration-200
             
              ${
                error
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-gray-300 focus-visible:ring-blue-500 hover:border-gray-400"
              }
             
            `}
            onBlur={onBlur}
                {...rest}
              />
             
              {value && (
                <button 
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()  
                  setShowPassword((s)=>!s)}}>
                  {showPassword ? (
                    <EyeIcon size={"18px"} />
                  ) : (
                    <EyeClosedIcon size={"18px"} />
                  )}
                </button>
               )} 
            </div>
          )}
          {error && <p className="text-red-500 text-xs"><span className="text-lg">⚠</span>{error}</p>}
        </div>
      </>
    );
  }
);
AdminInputField.displayName = "AdminInputField";

export default AdminInputField;

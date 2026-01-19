import React from "react";

interface AppTextTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  className: string;
  value?: string | number ;
  error?: string;
  type?: 'text' | 'password' | 'date';
  backendError?: string;
}


const AdminInputField= React.forwardRef<HTMLInputElement, AppTextTypes>(
    ({label, placeholder,className,value,error,type,backendError, ...rest}, ref
)=> {
  return (
    <>
    <div className={className} >

      <label className="text-sm font-light">{label}</label>
      <input
        type={type}
        ref={ref}
        placeholder={placeholder || backendError}
        value={value}
        className="flex h-9 w-full rounded-md border  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ring-amber-500"
        {...rest}
        />
        {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    </>
  );
}
);
AdminInputField.displayName = "AdminInputField";

export default AdminInputField;

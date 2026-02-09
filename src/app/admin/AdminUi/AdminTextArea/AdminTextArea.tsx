import React from "react";

interface AppTextFieldTypes
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  className: string;
  value?: string;
  error?: string;
  rows?: number;
  cols?: number;
  backendError?: string;
}

const AdminTextArea = React.forwardRef<HTMLTextAreaElement, AppTextFieldTypes>(
  (
    {
      label,
      placeholder,
      className,
      value,
      rows,
      error,
      cols,
      backendError,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <div className={className}>
          <label className="text-sm font-light">{label}</label>
          <textarea
            rows={rows}
            cols={cols}
            ref={ref}
            placeholder={placeholder || backendError}
            value={value}
            className={`flex w-full rounded-md border ${
              error ? "border-red-500" : "border"
            }  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
              error ? "ring-red-500" : "ring-amber-500"
            }`}
            {...rest}
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
      </>
    );
  }
);
AdminTextArea.displayName = "AppTextArea";

export default AdminTextArea;

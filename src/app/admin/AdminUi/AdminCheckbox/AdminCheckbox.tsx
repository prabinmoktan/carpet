'use client';
import React, { useState } from "react";

interface AdminCheckboxTypes {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const AdminCheckbox = React.forwardRef<HTMLInputElement, AdminCheckboxTypes>(
  ({ label, name,checked,onChange, ...rest }, ref) => {
    // const [sale, setSale] = useState(true);
    return (
      <>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
                checked={checked}
              className="sr-only peer"
              name={name}
              ref={ref}
              onChange={(e)=> onChange(e.target.checked)}   
              {...rest}
            />
            <div className="relative w-9 h-5 bg-neutral-quaternary  shadow peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
            <span className="select-none ms-3 text-sm font-medium text-heading">
              {label}
            </span>
          </label>
        </div>
      </>
    );
  }
);

AdminCheckbox.displayName = "AdminCheckbox";
export default AdminCheckbox;

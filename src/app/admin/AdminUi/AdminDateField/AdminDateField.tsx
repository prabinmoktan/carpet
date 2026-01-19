import React from "react";
import { endsAt, isoToDateInput, startsAt } from "../../utils/date";

interface AdminDateFieldTypes  {
  label: string;
  placeholder?: string;
  className: string;
  value?:   string ;
  error?: string;
  type?: 'start' | 'end' ;
  backendError?: string;
  onChange: (value: string) => void;

}


const AdminDateField= React.forwardRef<HTMLInputElement, AdminDateFieldTypes>(
    ({label, placeholder,className,value,error,type= 'start',backendError,onChange, ...rest}, ref
)=> {

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawDate = e.target.value;
        if(!rawDate)return ;
        const iso = type === 'start' ? startsAt(rawDate) : endsAt(rawDate)
        console.log(iso);
        onChange(iso);
    }


  return (
    <>
    <div className={className}>

      <label className="text-sm font-light">{label}</label>
      <input
        type='date'
        ref={ref}
        placeholder={placeholder || backendError}
        value={isoToDateInput(value)}
        onChange= {handleDateChange}
        className="flex h-9 w-full rounded-md border  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ring-amber-500"
        {...rest}
        />
        {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    </>
  );
}
);
AdminDateField.displayName = "AdminDateField";

export default AdminDateField;

import React from "react";
import AdminInputField from "./AdminInputField/AdminInputField";
import { Control, Controller, FieldValues } from "react-hook-form";

interface ControlledFieldTypes {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control:  Control<FieldValues, any, FieldValues>;
}

const ControlledField: React.FC<ControlledFieldTypes> = ({ label, name, control }) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <AdminInputField label={label} className={""} {...field} />
        )}
      />
    </>
  );
};

export default ControlledField;

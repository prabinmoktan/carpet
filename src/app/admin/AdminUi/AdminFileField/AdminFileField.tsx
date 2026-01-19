"use client";
import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AdminFileFieldTypes {
  className: string;
  type: string;
  label?: string;
  error?: string;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  file: File[];
  setFile:(file: File[])=> void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminFileField = React.forwardRef<HTMLInputElement, AdminFileFieldTypes>(
  (
    { className, type, label, error, multiple, accept,  placeholder, file, setFile },
    ref
  ) => {
    const [preview, setPreview] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles) return;

      const mergedFiles = [...file, ...selectedFiles]
      setFile(mergedFiles);

      const urls = Array.from(selectedFiles).map((photo) => URL.createObjectURL(photo));
      // ✅ CALL the updater function directly
      setPreview((prev) => [...prev, ...urls]); // Spread urls!

      console.log("URLs added:", urls);
      console.log(preview);
      // onChange?.(e);
      // reset input so same file can be re-selected
    e.target.value = "";
    };

    // useEffect(() => {
    //   return () => {
    //     preview.forEach((url) => URL.revokeObjectURL(url));
    //   };
    // }, [preview]);

    const handleDelete = (item: number) => {
      const updatedFiles = file.filter((_, i)=> i !== item)
      const filteredItem = preview?.filter((_, index) => index !== item);
      setFile(updatedFiles);
      setPreview(filteredItem);
    };

    return (
      <>
        <div className={className}>
          {label && <label className="text-sm font-light">{label}</label>}

          <input
            ref={ref}
            type={type}
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
            placeholder={placeholder}
            className="flex w-full rounded-md  px-3 py-2 h-48 relative opacity-0 border-2"
          />

          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>

        {preview.length > 0 && (
          <div className="flex gap-3 mt-3">
            {preview.map((src, index) => (
              <div key={index} className="relative">
                <CircleX
                  color="red"
                  className="absolute 
             right-0 top-0
              z-10"
                  onClick={() => handleDelete(index)}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="preview"
                  width={20}
                  height={20}
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
);

AdminFileField.displayName = "AdminFileField";

export default AdminFileField;

"use client";
import OptimizedImage from "@/app/(public)/components/OptimizedImage/OptimizedImage";
import { CircleX, UploadCloud } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AdminFileFieldTypes {
  className: string;
  type: string;
  label?: string;
  error?: string;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  file: (string | File)[];
  // value?: string;
  setFile: (file: (File | string)[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  existingImages?: string[]; // pass existing image IDs from DB
  setExistingImages?: (images: string[]) => void; // optional setter for parent

}

const AdminFileField = React.forwardRef<HTMLInputElement, AdminFileFieldTypes>(
  (
    {
      className,
      type,
      label,
      error,
      multiple,
      accept,
      placeholder,
      file,
      // value,
      setFile,
      existingImages=[],
      setExistingImages
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string[]>([]);
  

   

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (file.length === 0) setPreview([]);
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles) return;

      const mergedFiles = [...file, ...Array.from(selectedFiles)];
      setFile(mergedFiles);

      const urls = Array.from(selectedFiles).map((photo) =>
        URL.createObjectURL(photo)
      );
      // ✅ CALL the updater function directly
      setPreview((prev) => [...prev, ...urls]); // Spread urls!

      // onChange?.(e);
      // reset input so same file can be re-selected
      e.target.value = "";
    };

    const handleDelete = (item: number) => {
      const updatedFiles = file.filter((_, i) => i !== item);
      const filteredItem = preview?.filter((_, index) => index !== item);
      setFile(updatedFiles);
      setPreview(filteredItem);
    };

    const handleDeleteExistingImage = (item: number) => {

      const imageToRemove = existingImages[item];

      const updatedExisting = existingImages.filter((_, i) => i !== item);
      if(setExistingImages)setExistingImages(updatedExisting);

        //removing from form images 
        const updatedFiles = file.filter((img)=> img!== imageToRemove);
        setFile(updatedFiles);


    };

    return (
      <>
        <div className={`${className} relative  `}>
          {label && <label className="text-sm font-light">{label}</label>}

          <input
            ref={ref}
            type={type}
            multiple={multiple}
            accept={accept}
            // value={value}
            onChange={handleFileChange}
            placeholder={placeholder}
            className="flex w-full rounded-md  px-3 py-2 h-20 relative opacity-0 border-2 z-10"
          />
          <UploadCloud
            size={48}
            color="green"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
          />

          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
      {
        existingImages.length > 0 && (
          <div className="flex gap-3 mt-3">
          {existingImages.map((src, index) => (
            <div key={index} className="relative">
              <CircleX
                color="red"
                className="absolute 
           right-0 top-0
            z-10"
                onClick={() => handleDeleteExistingImage(index)}
              />

              <OptimizedImage
                publicId={src}
                alt="preview"
                width={200}
                height={200}
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          ))}
        </div>
        )

      }

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
                  className="w-20 h-20 object-cover rounded"
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

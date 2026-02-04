"use client";
import React, { Activity } from "react";
import { useProductHooks } from "../useProductHooks/useProductHooks";
import { Controller } from "react-hook-form";
import AdminInputField from "@/app/admin/AdminUi/AdminInputField/AdminInputField";
import AdminSelectInput from "@/app/admin/AdminUi/AdminSelectInput";
import AdminTextArea from "@/app/admin/AdminUi/AdminTextArea/AdminTextArea";
import AdminFileField from "@/app/admin/AdminUi/AdminFileField/AdminFileField";
import AdminCheckbox from "@/app/admin/AdminUi/AdminCheckbox/AdminCheckbox";
import AdminDateField from "@/app/admin/AdminUi/AdminDateField/AdminDateField";
import { motion } from "framer-motion";
import Button from "@/app/(public)/ui/Button/Button";


const ProductForm = () => {
  const { handleSubmit, control, errors, isSale, isLoading, isValid, isDirty } = useProductHooks();
  

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="flex gap-10">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <AdminInputField
                label={"Title"}
                error={errors?.title?.message}
                className="flex flex-col gap-2 w-full"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <AdminSelectInput
                options={[]}
                label={"Category"}
                className="flex flex-col gap-2 w-full"
                error={errors?.category?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <AdminTextArea
              label={"Description"}
              className="flex flex-col gap-2"
              error={errors.description?.message}
              cols={4}
              rows={4}
              {...field}
            />
          )}
        />
        <div className="flex gap-4">
          <Controller
            control={control}
            name="specs.size"
            render={({ field }) => (
              <AdminInputField
                label={"Size"}
                className="flex flex-col gap-2 w-full"
                error={errors.specs?.size?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="specs.country"
            render={({ field }) => (
              <AdminInputField
                label={"Country"}
                className="flex flex-col gap-2  w-full"
                error={errors.specs?.country?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="specs.material"
            render={({ field }) => (
              <AdminInputField
                label={"Material"}
                className="flex flex-col gap-2  w-full"
                error={errors.specs?.material?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <AdminInputField
              label={"Price"}
              className="flex flex-col gap-2"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="stock"
          render={({ field }) => (
            <AdminInputField
              label={"Stock"}
              className="flex flex-col gap-2"
              {...field}
            />
          )}
        />

        <Controller
          name="isSale"
          control={control}
          render={({ field }) => (
            <AdminCheckbox checked={!!field.value} label="On Sale" {...field} />
          )}
        />
        <Activity mode={isSale ? "visible" : "hidden"}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className=" flex gap-10"
          >
            <Controller
              control={control}
              name="sale.startsAt"
              render={({ field }) => (
                <AdminDateField
                  label={"startsAt"}
                  type="start"
                  className={"w-full"}
                  {...field}
                />
              )}
            />{" "}
            <Controller
              control={control}
              name="sale.endsAt"
              render={({ field }) => (
                <AdminDateField
                  label={"endsAt"}
                  type="end"
                  className={"w-full"}
                  {...field}
                />
              )}
            />{" "}
            <Controller
              control={control}
              name="sale.percentage"
              render={({ field }) => (
                <AdminInputField
                  label={"sale percentage"}
                  className={"w-full"}
                  {...field}
                />
              )}
            />
          </motion.div>
        </Activity>
        <div className="w-full">
          <h1>Product Images</h1>

          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <div className="space-y-4">
                <AdminFileField
                  type="file"
                  file={field.value}
                  setFile={(files) => field.onChange(files)}
                  multiple={true}
                  placeholder="Upload  image"
                  error={errors.images?.message?.toString()}
                  className={"border border-dashed rounded-md"}
                  {...field}
                />
              </div>
            )}
          />
        </div>
       <Button title={"Upload Product"} variant={"primary"} isLoading={isLoading}  />
      </form>
    </>
  );
};

export default ProductForm;

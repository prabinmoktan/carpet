"use client";

import React, { Activity } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ProductDefaultValues } from "../../AdminDefaultValues";
import AdminInputField from "../../AdminUi/AdminInputField/AdminInputField";
import { ProductFormValues } from "../../AdminType";

import AdminTextArea from "../../AdminUi/AdminTextArea/AdminTextArea";
import AdminFileField from "../../AdminUi/AdminFileField/AdminFileField";
import AdminCheckbox from "../../AdminUi/AdminCheckbox/AdminCheckbox";
import { motion } from "framer-motion";
import AdminDateField from "../../AdminUi/AdminDateField/AdminDateField";
import { useCreateProductMutation } from "./product.api";

const Page = () => {
const [createProduct, {isLoading}] = useCreateProductMutation();
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: ProductDefaultValues,
  });
  const isSale = useWatch({
    control,
    name: "isSale",
  }) as boolean;
  const onsubmit = async(data: ProductFormValues) => {
   
    const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("price", String(data.price));
  formData.append("stock", String(data.stock));
  formData.append("description", data.description);

  formData.append("specs", JSON.stringify(data.specs));

  if (data.isSale && data.sale) {
    formData.append("sale", JSON.stringify(data.sale));
  }

  data.images.forEach((file) => {
    formData.append("images", file);
  });
    const response = await createProduct(formData).unwrap();
    console.log(response)
  };
  return (
    <>
      <div className="flex flex-col space-y-10 px-10 mt-10 h-[10000px]">
        <form onSubmit={handleSubmit(onsubmit)} className="space-x-6 space-y-6">
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
                <AdminInputField
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
          <div className="w-full">
            <h1>Upload Images</h1>

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
                    label="Images"
                    placeholder="Upload  image"
                    error={errors.images?.message?.toString()}
                    className={""}
                    {...field}
                  />
                </div>
              )}
            />
          </div>
          <Controller
            name="isSale"
            control={control}
            render={({ field }) => (
              <AdminCheckbox checked={field.value} label="On Sale" {...field} />
            )}
          />
          <Activity mode={isSale ? "visible" : "hidden"}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border h-28 flex gap-10"
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
          {isSale ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "100px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="border h-28"
            ></motion.div>
          ) : (
            "hello"
          )}
          <button
            type="submit"
            className="bg-blue-400 px-3 py-2 rounded-sm focus:bg-blue-500  "
            onClick={() => console.log("object")}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;

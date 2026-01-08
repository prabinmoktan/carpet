'use client'
import AppText from "@/app/(public)/ui/AppText/AppText";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues = {
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  specs: '',
  files: [],
}

const Page = () => {
  const {handleSubmit, control} = useForm({defaultValues})
  console.log('date==>',Date())
  console.log('new date==>',new Date)
  const onsubmit = (data: any)=> {
    console.log(data)
  }
  return (
    <>
      <div className="flex flex-col space-y-10 px-10 mt-10">
        <form onSubmit={handleSubmit(onsubmit)}></form>
      <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <AppText
                label={"Name"}
                className="flex flex-col gap-2"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <AppText
                label={"Name"}
                className="flex flex-col gap-2"
                {...field}
              />
            )}
          /><Controller
          control={control}
          name="specs"
          render={({ field }) => (
            <AppText
              label={"Name"}
              className="flex flex-col gap-2"
              {...field}
            />
          )}
        /><Controller
        control={control}
        name="title"
        render={({ field }) => (
          <AppText
            label={"Name"}
            className="flex flex-col gap-2"
            {...field}
          />
        )}
      /><Controller
      control={control}
      name="title"
      render={({ field }) => (
        <AppText
          label={"Name"}
          className="flex flex-col gap-2"
          {...field}
        />
      )}
    /><Controller
    control={control}
    name="title"
    render={({ field }) => (
      <AppText
        label={"Name"}
        className="flex flex-col gap-2"
        {...field}
      />
    )}
  />
        <button type="submit" className="bg-blue-400 px-3 py-2 rounded-sm focus:bg-blue-500  " onClick={()=> console.log('object')}>Submit</button>
      </div>
    </>
  );
};

export default Page;

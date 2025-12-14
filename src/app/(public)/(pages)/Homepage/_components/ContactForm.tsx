"use client";
import AnimateParagraph from "@/app/(public)/ui/AnimateParagraph/AnimateParagraph";
import AnimatePara from "@/app/(public)/ui/AnimateParagraph/AnimateParagraph";
import AppText from "@/app/(public)/ui/AppText/AppText";
import AppTextArea from "@/app/(public)/ui/AppTextarea/AppTextarea";
import TitleHeader from "@/app/(public)/ui/TitleHeader/TitleHeader";
import { contactDefaultValues } from "@/app/defaultValues";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const ContactForm = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: contactDefaultValues,
  });

  const onSubmit = (data: unknown) => console.log(data);
  return (
    <>
      <section className="space-y-10 px-10">
        <article>
          <TitleHeader title={"get in touch"} />
          <AnimateParagraph
            paragraph={
              "Email us or reach out to our team for personalized assistance"
            }
          />
        </article>
        <section className="grid grid-cols-1 md:grid-cols-2 m">
          <div className="space-y-10">
            <div className="flex gap-2 items-center">
              <Phone className="text-amber-500" />
              <span className="space-y-1">
                <p> +1 (555) 123-4567</p>
                <p className="font-light text-gray-500">Mon-Sat 10am-6pm</p>
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Mail className="text-amber-500" />
              <span className="space-y-1">
                <p> +1 (555) 123-4567</p>
                <p className="font-light text-gray-500">Mon-Sat 10am-6pm</p>
              </span>
            </div>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <Controller
              control={control}
              name="name"
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
              name="phone"
              render={({ field }) => (
                <AppText
                  label={"Phone(Optional)"}
                  className="flex flex-col gap-2"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <AppText
                  label={"Email"}
                  className="flex flex-col gap-2"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <AppTextArea
                  label={"Message"}
                  rows={4}
                  cols={4}
                  className="flex flex-col gap-2"
                  {...field}
                />
              )}
            />
            <button type="submit">submit</button>
          </form>
        </section>
      </section>
    </>
  );
};

export default ContactForm;

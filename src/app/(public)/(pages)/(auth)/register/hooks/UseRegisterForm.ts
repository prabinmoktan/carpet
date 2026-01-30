"use client";

import { UserRegisterDefaultvalues } from "@/app/admin/AdminDefaultValues";
import { RegisterSchemaWithConfirm } from "@/app/admin/AdminSchemas";
import { RegsiterTypes } from "@/app/admin/AdminType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../auth.api";

export function UseRegisterForm() {
  const [userRegister, { isLoading }] = useRegisterUserMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: UserRegisterDefaultvalues,
    resolver: zodResolver(RegisterSchemaWithConfirm),
    mode: "onChange",
  });
  const onSubmit = async (data: RegsiterTypes) => {
    try {
      const response = await userRegister(data).unwrap();
    } catch {}
  };
  return {
    control,
    handleSubmit:handleSubmit(onSubmit),
    errors
  };
}

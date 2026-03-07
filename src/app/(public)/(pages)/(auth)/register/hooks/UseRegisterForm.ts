"use client";

import { UserRegisterDefaultvalues } from "@/app/admin/AdminDefaultValues";
import { RegisterSchemaWithConfirm } from "@/app/admin/AdminSchemas";
import { RegsiterTypes } from "@/app/admin/AdminType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../auth.api";

import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/app/services/toastService";

export function UseRegisterForm() {
  const [userRegister, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: UserRegisterDefaultvalues,
    resolver: zodResolver(RegisterSchemaWithConfirm),
    mode: "onChange",
  });
  const onSubmit = async (data: RegsiterTypes) => {
    try {
      const response = await userRegister(data).unwrap();
      

      if (response?.message) {
        showSuccess(response?.message)
      }
      router.replace('/login')

      reset();
    } catch(error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      showError(error?.data.message as string)
    }
  };
  return {
    control,
    handleSubmit:handleSubmit(onSubmit),
    errors,
    isLoading
  };
}

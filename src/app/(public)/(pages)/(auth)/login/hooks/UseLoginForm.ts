"use client";
import { UserLoginDefaultValues } from "@/app/admin/AdminDefaultValues";
import { LoginSchema } from "@/app/admin/AdminSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../auth.api";
import { LoginPageTypes } from "@/app/admin/AdminType";
import { useRouter, useSearchParams } from "next/navigation";
import { showError, showSuccess } from "@/app/services/toastService";

export const UseLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues:UserLoginDefaultValues, 
    resolver: zodResolver(LoginSchema),
    mode: "onTouched", 
    reValidateMode: "onChange"
  })
  const [loginUser, { isLoading }] = useLoginUserMutation();
 

    const onSubmit = async (data: LoginPageTypes) => {
    try {
      const response = await loginUser(data).unwrap();
      
      if (response.success === true) {
        showSuccess(`${response.message}`);

        router.push(returnTo || response.redirectTo );
      }
      if (response.success === false) {
        const errorMessage = response.message;

        showError(`${errorMessage}`);

        setError("email", {
          type: "server",
          message: errorMessage,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.data?.message ||
        (error as Error)?.message ||
        "An error occurred during login";

      showError(errorMessage);

      setError("email", {
        type: "server",
        message: errorMessage,
      });
    }
  };

  return { submitHandler:handleSubmit(onSubmit), control, errors, isLoading };
};

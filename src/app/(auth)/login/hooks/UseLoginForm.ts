import { UserLoginDefaultValues } from "@/app/admin/AdminDefaultValues";
import { LoginSchema, RegisterSchema } from "@/app/admin/AdminSchemas";
import { LoginPageTypes } from "@/app/admin/AdminType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const UseLoginForm = () => {
  const methods = useForm({
    defaultValues: UserLoginDefaultValues,
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const onsubmit = (data: LoginPageTypes) => {
    console.log(data);
  };

  return { onsubmit: methods.handleSubmit(onsubmit), methods, reset: methods.reset,  };
};

"use client";
import { UserLoginDefaultValues } from "@/app/admin/AdminDefaultValues";
import { LoginSchema } from "@/app/admin/AdminSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../auth.api";
import { LoginPageTypes } from "@/app/admin/AdminType";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export const UseLoginForm = () => {
   const router = useRouter();
 
  
  const {handleSubmit, control, setError, formState: {errors}} = useForm({
    defaultValues: UserLoginDefaultValues,
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
   const [loginUser,{ isLoading}] = useLoginUserMutation();
  

  const onSubmit=async(data: LoginPageTypes)=> {
    try {
 
   const response = await loginUser(data).unwrap();
   console.log('response==>', response)
   if(response.success){
  
    toast.success(`${response.message}`, {position: "bottom-right"});
    router.push(response.redirectTo)
   }else if(response.sucess === false){
    const errorMessage = response.message || "Login failed";
        
    toast.error(errorMessage, {
      position: "bottom-right",
    });
    
    setError("email", {
      type: "server",
      message: errorMessage,
    });
  }
   
   
    } catch (error: unknown) {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (error as any)?.data?.message || 
      (error as Error)?.message || 
      "An error occurred during login";

toast.error(errorMessage, { position: "bottom-right" });

setError("email", {
type: "server",
message: errorMessage,
});
    }
  }

  return {handleSubmit: handleSubmit(onSubmit), control, setError, errors};
};

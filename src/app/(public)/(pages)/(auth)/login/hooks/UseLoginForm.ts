"use client";
import { UserLoginDefaultValues } from "@/app/admin/AdminDefaultValues";
import { LoginSchema } from "@/app/admin/AdminSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../auth.api";
import { LoginPageTypes } from "@/app/admin/AdminType";
import { useRouter, useSearchParams } from "next/navigation";
import { showError, showSuccess } from "@/app/services/toastService";
import { useMergeCartMutation } from "@/app/services/cart.api";
import { selectCart } from "@/app/redux/slice/cart/cart.selector";
import { useSelector } from "react-redux";
import useGuestCart from "../../../cartpage/hooks/useGuestCart";

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
  const {cart, clearGuestCart} = useGuestCart();
  console.log(cart)
  const [mergeCart] = useMergeCartMutation();
 

    const onSubmit = async (data: LoginPageTypes) => {
    try {
      const response = await loginUser(data).unwrap();
      
      if (response.success === true) {
        showSuccess(`${response.message}`);
        if(cart?.length > 0){
          console.log("cart.length==>", cart.length)
          await mergeCart({
            items: cart.map((item)=> ({
              productId: item._id,
              quantity: item.quantity
            }))
          }).unwrap();
          clearGuestCart();
        }

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

import { useForm, useWatch } from "react-hook-form";
import { useCreateProductMutation } from "../product.api";
import { ProductDefaultValues } from "@/app/admin/AdminDefaultValues";
import { ProductFormValues } from "@/app/admin/AdminType";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/admin/AdminSchemas";

export const    useProductHooks = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: ProductDefaultValues,
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });
  const isSale = useWatch({
    control,
    name: "isSale",
  }) as boolean;

 

  const onsubmit = async (data: ProductFormValues) => {
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

    data.images.forEach((file:File) => {
      formData.append("images", file);
    });
    console.log(control._fields)
    const response = await createProduct(formData).unwrap();
    
    if(response.success){
        toast.success(`${response.message}`, {position: "bottom-right"})
        reset({...ProductDefaultValues, images: []});
    }
  };

  return {
    handleSubmit: handleSubmit(onsubmit), errors, isSale,control, isLoading, isValid, isDirty
  };
};

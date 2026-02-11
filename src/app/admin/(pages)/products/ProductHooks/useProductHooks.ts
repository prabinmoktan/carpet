import { useForm, useWatch } from "react-hook-form";
import { useCreateProductMutation } from "../../../../services/product.api";
import { ProductFormValues } from "@/app/admin/AdminType";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/admin/AdminSchemas";

export const useProductHooks = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      isLatest: false,
      isSale: false,
      title: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
      specs: {
        size: "",
        material: "",
        country: "",
      },
      images: [],
    },
    resolver: zodResolver(productSchema),
    shouldUnregister: true
    // mode: "onChange",
  });
  const isSale = useWatch({
    control,
    name: "isSale",
  }) as boolean;

  const onsubmit = async (data: ProductFormValues) => {
    try {
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
     // data.images.forEach((file:File) => {
    //   formData.append("images", file);
    // });
    for (const file of data.images) {
      formData.append("images", file);
    }

    const response = await createProduct(formData).unwrap();

    if (response.success) {
      toast.success(response.message, { position: "bottom-right" });
      reset({  images: [] });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error.data?.message || "Failed to create product", {
        position: "bottom-right",
      });
    }
    
    

   
  };

  return {
    handleSubmit: onsubmit,
    errors,
    isSale,
    control,
    isLoading,
    isValid,
    isDirty,
  };
};

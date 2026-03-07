import { useForm, useWatch, Watch } from "react-hook-form";
import {
  useCreateProductMutation,
  useEditProductMutation,
} from "../../../../services/product.api";
import { ProductFormValues } from "@/app/admin/AdminType";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/admin/AdminSchemas";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UseProductHookProps {
  mode: "create" | "edit";
  productId?: string;
  defaultValues?: Partial<ProductFormValues>;
}

export const useProductHooks = ({
  mode,
  productId,
  defaultValues,
}: UseProductHookProps) => {
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isEditting }] = useEditProductMutation();

  const route = useRouter();
  

  const hasSaleData = !!(
    defaultValues?.sale?.discountPercent  as number||
    defaultValues?.sale?.startsAt ||
    defaultValues?.sale?.endsAt
  );

  const {
    handleSubmit,
    control,
    reset,

    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      images: defaultValues?.images || [],
      sale: hasSaleData ? defaultValues?.sale : null,
      isSale: defaultValues?.isSale ?? hasSaleData, // spread override
      ...defaultValues,
    },
    resolver: zodResolver(productSchema),
    // shouldUnregister: true
    mode: "onChange",
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isSaleWatched = useWatch({ control, name: "isSale" });
  // Show sale fields if checkbox is on OR if defaultValues already has sale data
  const sale =
    isSaleWatched ||
    !!(
      defaultValues?.sale?.discountPercent ||
      defaultValues?.sale?.startsAt ||
      defaultValues?.sale?.endsAt
    );

  const onSubmit = async (data: ProductFormValues) => {
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

      const existingImages: string[] = [];
      const newFiles: File[] = [];

      for(const image of data.images as (File | string)[]){
          if(typeof image === "string"){
          
            existingImages.push(image)
          }else if(image instanceof File){
          
            newFiles.push(image)

          }
      }
//apending files
      for (const file of newFiles) {
        formData.append("images", file);
      }
      formData.append("existingImages", JSON.stringify(existingImages));

      let response;
      if (mode === "create") {
        response = await createProduct(formData).unwrap();
      }
      if (mode === "edit") {
       
        if (!productId) {
          throw new Error("Product Id Missing");
        }
        response = await updateProduct({ productId, data: formData }).unwrap();

        route.replace("/admin/products");
      }
      toast.success(response.message, { position: "bottom-right" });
      if (mode === "create") {
        reset({ images: [] });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create product", {
        position: "bottom-right",
      });
    }
  };

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleSubmit: handleSubmit(onSubmit, (errors)=>console.log("validators errors:", errors)),
    errors,
    sale,
    control,
    isLoading: isCreating || isEditting,

    isValid,
    isDirty,
  };
};

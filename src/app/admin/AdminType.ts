// types/product-form.ts
export interface ProductFormValues {
    title: string;
    category: string;
    price: number;
    images: File[];
    description: string;
  
    specs: {
      size: string;
      material: string;
      country: string;
    };
  
    stock: number;
  isSale?: boolean;
    sale?: {
      percentage: number;
      startsAt: string;
      endsAt: string;
      isActive: boolean;
    };
  }
  
  export interface LoginPageTypes{
    email: string;
    password: string;
  }
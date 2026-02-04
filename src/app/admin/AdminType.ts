// types/product-form.ts
export interface ProductFormValues {
  title: string;
  category: string;
  price: number;
  images: string[];
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
    isActive?: boolean;
  };
}
export interface Pagination {
  total: number;
  skip: number;
  page: number;
  pages: number;
}
export interface GetProductsResponse {
  success: boolean;
  message: string;
  pagination: Pagination;
  response: ProductFormValues[]; // This is what your backend actually returns
}

export interface LoginPageTypes {
  email: string;
  password: string;
}

export interface RegsiterTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}




// ✅ Define response types matching your backend




// types/product-form.ts
export interface ProductFormValues {
  finalPrice: number;
  isLatest: boolean;
  // isLatest: boolean;
  _id?: string;
  title: string;
  category: string;
  price: number;
  images: string[] | string | File[] ;
  description: string;
  specs: {
    size: string;
    material: string;
    country: string;
  };
  stock: number;
  isSale?: boolean;
  sale: undefined;
  
}
export interface Pagination {
  total: number;
  skip: number;
  page: number;
  pages: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc";

}
export interface GetProductsParams {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc";
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


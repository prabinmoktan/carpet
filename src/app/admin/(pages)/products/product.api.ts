import { baseApiSlice } from "@/app/axios/baseApiConfig";
import { GetProductsResponse } from "../../AdminType";

const productApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "/products",
        method: "GET",
        
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;

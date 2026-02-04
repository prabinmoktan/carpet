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
    getProducts: builder.query<GetProductsResponse,  { page?: number; limit?: number }>({
      query: ({page= 1, limit= 10}) => ({
        url: "/products",
        method: "GET",
        params:  { page, limit }
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;

import { baseApiSlice } from "@/app/axios/baseApiConfig";
import { GetProductsResponse } from "../admin/AdminType";

const productApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Products"]
    }),
    getProducts: builder.query<GetProductsResponse,  { page?: number; limit?: number }>({
      query: ({page, limit}) => ({
        url: "/products",
        method: "GET",
        params:  { page, limit }
      }),
      providesTags:["Products"]
    }),
    deleteProduct: builder.mutation({
      query: (id)=> ({
        url: `/products/${id}`,
        method: "DELETE",
        // body: id, 
        
      }),
      invalidatesTags: ["Products"]
    }),
    getProductById: builder.query({
      query: (id)=> ({
        url: `/products/${id}`,
        method: "GET",
        body: id
      })
    })
  }),
  
});

export const { useCreateProductMutation, useGetProductsQuery, useDeleteProductMutation, useGetProductByIdQuery } = productApi;

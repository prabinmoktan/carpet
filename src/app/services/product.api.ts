import { baseApiSlice } from "@/app/axios/baseApiConfig";
import { GetProductsParams, GetProductsResponse } from "../admin/AdminType";

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
    getProducts: builder.query<GetProductsResponse,  GetProductsParams>({
      query: ({page, limit, minPrice, maxPrice, sort}) => {
        const params = new URLSearchParams();

        if (minPrice !== undefined)
          params.append("minPrice", String(minPrice));
    
        if (maxPrice !== undefined)
          params.append("maxPrice", String(maxPrice));
    
        if (sort)
          params.append("sort", sort);
    
        if (page)
          params.append("page", String(page));
    
        if (limit)
          params.append("limit", String(limit));
        return{
          url: `/products?${params.toString()}`,
          method: "GET",
          params:  { page, limit, minPrice, maxPrice, sort }

        }
      },
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

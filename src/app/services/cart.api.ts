import { baseApiSlice } from "../axios/baseApiConfig";
import { CartApiresponse, UpdateQuantityArgs } from "../types";



const cartApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postCartItems: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }]
    }),
    getCart: builder.query<CartApiresponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: [{ type: "Cart", id: "LIST" }]
    }),
    deleteCart: builder.mutation<CartApiresponse, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }]
    }),
    deleteCartItem: builder.mutation<CartApiresponse, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }]
    }),
    updateCart: builder.mutation<CartApiresponse, UpdateQuantityArgs>({
      query: ({ id, action }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }]
    }),
  }),
});

export const {
  usePostCartItemsMutation,
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApi;

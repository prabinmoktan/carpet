import { baseApiSlice } from "../axios/baseApiConfig";

const cartApi = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        postCartItems: builder.mutation({
            query: (data) => ({
                url: '/cart',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Cart"]
        })
    })
})

export const {usePostCartItemsMutation} = cartApi;
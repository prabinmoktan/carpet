import { baseApiSlice } from "../axios/baseApiConfig";

const checkoutApi = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        createOrder:builder.mutation({
            query:(data)=> ({
                url: '/checkout',
                method: "POST", 
                body: data
            }), 
            invalidatesTags: ["checkout"]

        })
    })
})

export const {useCreateOrderMutation} = checkoutApi
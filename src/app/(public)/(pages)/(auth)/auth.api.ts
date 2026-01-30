import { baseApiSlice } from "../../../axios/baseApiConfig";

export interface User {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "user";
    isVerified: boolean;

    createdAt: string;
    updatedAt: string;
  };
}

const userApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: (data) => ({
        url: "/auth/logout",
        method: "POST",
        body: data,
      }),
    }),
    refreshAccessToken: builder.mutation({
      query: (data) => ({
        url: "/auth/refreshAccessToken",
        method: "POST",
        body: data,
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshAccessTokenMutation,
  useMeQuery,
} = userApi;

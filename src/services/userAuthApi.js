import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://api.spectalyzer.com/api/user/" }),
  endpoints: (builder) => ({
    // 1) Register
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    // 2) Login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    // 3) Get Logged User
    getLoggedUser: builder.query({
      query: (token) => ({
        url: "loggeduser",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    // 4) Change Password
    changePassword: builder.mutation({
      query: ({ token, password, password_confirmation }) => ({
        url: "changepassword",
        method: "POST",
        body: { password, password_confirmation },
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useChangePasswordMutation,
} = userAuthApi;

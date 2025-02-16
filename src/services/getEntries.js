import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getEntries = createApi({
  reducerPath: "getEntries",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserEntries: builder.query({
      query: ({ token }) => {
        return {
          url: `/getUserEntries`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

// Export your hooks for usage in functional components
export const { useGetUserEntriesQuery } = getEntries;

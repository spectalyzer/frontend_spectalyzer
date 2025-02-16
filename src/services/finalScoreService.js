import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const finalScoreService = createApi({
  reducerPath: "finalScoreService",
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
    getFinalScore: builder.query({
      query: ({ token, selectedDate }) => {
        // If selectedDate is provided, append ?selectedDate=YYYY-MM-DD
        const queryString = selectedDate ? `?selectedDate=${selectedDate}` : "";
        return {
          url: `/getFinalScore${queryString}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetFinalScoreQuery } = finalScoreService;

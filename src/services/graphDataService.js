import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const graphDataService = createApi({
  reducerPath: "graphDataService",
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
    getschoolingPieChartData: builder.query({
      query: () => ({
        url: "/getschoolingPieChartData",
        method: "GET",
      }),
    }),
    getFoodBarChartData: builder.query({
      query: () => ({
        url: "/getFoodBarChartData",
        method: "GET",
      }),
    }),

    createEntry: builder.mutation({
      query: (data) => ({
        url: "/createEntry",
        method: "POST",
        body: data,
      }),
    }),
    getSleepingLineChartData: builder.query({
      query: () => ({
        url: "/getSleepingLineChartData",
        method: "GET",
      }),
    }),
    getscreenTimeBarChartData: builder.query({
      query: () => ({
        url: "/getscreenTimeBarChartData",
        method: "GET",
      }),
    }),
    getmakingNoiseBarChartData: builder.query({
      query: () => ({
        url: "/getmakingNoiseBarChartData",
        method: "GET",
      }),
    }),
    getwalkingLineChartData: builder.query({
      query: () => ({
        url: "/getwalkingLineChartData",
        method: "GET",
      }),
    }),
    getwakingUpBarChartData: builder.query({
      query: () => ({
        url: "/getwakingUpBarChartData",
        method: "GET",
      }),
    }),
    getgoingToSleepBarChartData: builder.query({
      query: () => ({
        url: "/getgoingToSleepBarChartData",
        method: "GET",
      }),
    }),
    getclassActivityLineChartData: builder.query({
      query: () => ({
        url: "/getclassActivityLineChartData",
        method: "GET",
      }),
    }),
    getoutdoorActivityLineChartData: builder.query({
      query: () => ({
        url: "/getoutdoorActivityLineChartData",
        method: "GET",
      }),
    }),
    getjunkFoodLineChartData: builder.query({
      query: () => ({
        url: "/getjunkFoodLineChartData",
        method: "GET",
      }),
    }),
    getShowingAngerAverageCard: builder.query({
      query: () => ({
        url: "/getShowingAngerAverageCard",
        method: "GET",
      }),
    }),
    gethitWithHandAverageCard: builder.query({
      query: () => ({
        url: "/gethitWithHandAverageCard",
        method: "GET",
      }),
    }),
    getoutgoingTendencyAverageCard: builder.query({
      query: () => ({
        url: "/getoutgoingTendencyAverageCard",
        method: "GET",
      }),
    }),
    getbedwettingAverageCard: builder.query({
      query: () => ({
        url: "/getbedwettingAverageCard",
        method: "GET",
      }),
    }),
    getcooperateAtSchoolAverageCard: builder.query({
      query: () => ({
        url: "/getcooperateAtSchoolAverageCard",
        method: "GET",
      }),
    }),
    getschoolingCountCard: builder.query({
      query: () => ({
        url: "/getschoolingCountCard",
        method: "GET",
      }),
    }),
    gettherapyAtSchoolCountCard: builder.query({
      query: () => ({
        url: "/gettherapyAtSchoolCountCard",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetschoolingPieChartDataQuery,
  useGetFoodBarChartDataQuery,
  useGetSleepingLineChartDataQuery,
  useGetscreenTimeBarChartDataQuery,
  useGetmakingNoiseBarChartDataQuery,
  useGetwalkingLineChartDataQuery,
  useGetwakingUpBarChartDataQuery,
  useGetgoingToSleepBarChartDataQuery,
  useGetclassActivityLineChartDataQuery,
  useGetoutdoorActivityLineChartDataQuery,
  useGetjunkFoodLineChartDataQuery,
  useGetShowingAngerAverageCardQuery,
  useGethitWithHandAverageCardQuery,
  useGetoutgoingTendencyAverageCardQuery,
  useGetbedwettingAverageCardQuery,
  useGetcooperateAtSchoolAverageCardQuery,
  useGetschoolingCountCardQuery,
  useGettherapyAtSchoolCountCardQuery,
  useCreateEntryMutation,
} = graphDataService;

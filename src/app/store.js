import { configureStore } from "@reduxjs/toolkit";
import { userAuthApi } from "../services/userAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { finalScoreService } from "../services/finalScoreService";
import { graphDataService } from "../services/graphDataService";
import { dataEntryApi } from "../services/dataEntryApi";
import { getEntries } from "../services/getEntries";
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [finalScoreService.reducerPath]: finalScoreService.reducer,
    [graphDataService.reducerPath]: graphDataService.reducer,
    [dataEntryApi.reducerPath]: dataEntryApi.reducer,
    [getEntries.reducerPath]: getEntries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      finalScoreService.middleware,
      graphDataService.middleware,
      dataEntryApi.middleware,
      getEntries.middleware
    ),
});

setupListeners(store.dispatch);

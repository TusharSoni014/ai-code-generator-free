import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    generateCode: builder.mutation<any, string>({
      query: (prompt) => {
        console.log("prompt from query: " + prompt);
        return {
          url: "/",
          method: "POST",
          body: { prompt: prompt },
        };
      },
    }),
  }),
});

export const { useGenerateCodeMutation } = api;

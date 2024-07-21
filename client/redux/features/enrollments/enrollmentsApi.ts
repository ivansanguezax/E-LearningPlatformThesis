import { apiSlice } from "../api/apiSlice";

export const enrollmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnrollments: builder.query({
      query: () => ({
        url: `get-enrollments`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createEnrollment: builder.mutation({
      query: ({ courseId }) => ({
        url: "create-enrollment",
        body: {
          courseId,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { 
  useGetAllEnrollmentsQuery,
  useCreateEnrollmentMutation
} = enrollmentsApi;
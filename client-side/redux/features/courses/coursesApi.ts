import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCoursesByAdmin: builder.query({
      query: () => ({
        url: "courses/get-courses-by-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `users/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    editCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `courses/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesByAdminQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
} = courseApi;

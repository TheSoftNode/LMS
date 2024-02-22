import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "users/upload-profile-picture",
        method: "PATCH",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    EditProfile: builder.mutation({
      query: ({ name }) => ({
        url: "users/update-user-info",
        method: "PATCH",
        body: {
          name,
          //   email,
        },
        credentials: "include" as const,
      }),
    }),

    UpdatePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "users/update-password",
        method: "PATCH",
        body: {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        credentials: "include" as const,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "users/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "users/update-user-role",
        method: "PATCH",
        body: {
          email,
          role,
        },
        credentials: "include" as const,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;

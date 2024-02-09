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
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
} = userApi;

import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<LogInResponse, LogInRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body: {
          emailOrUsername: body.emailOrUsername,
          password: body.password,
        },
        params: {
          next: body.next,
        },
      }),
      invalidatesTags: ['auth'],
    }),

    signup: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
        },
        params: {
          next: body.next,
        },
      }),
      invalidatesTags: ['auth'],
    }),

    logOut: build.mutation<LogOutResponse, LogOutRequest>({
      query: (body) => ({
        url: '/logout',
        method: 'POST',
        params: {
          next: body.next,
        },
      }),
      invalidatesTags: ['auth'],
    }),

    emailVerification: build.mutation<
      EmailVerificationResponse,
      EmailVerificationRequest
    >({
      query: (body) => ({
        url: '/email-verification',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/password/forgot',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: '/password/reset',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    sendOtp: build.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({
        url: '/send-otp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    logInOtp: build.mutation<LogInOtpResponse, LogInOtpRequest>({
      query: (body) => ({
        url: '/login-otp',
        method: 'POST',
        body: {
          email: body.email,
          otp: body.otp,
        },
        params: {
          next: body.next,
        },
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useLogInMutation,
  useSignupMutation,
  useLogOutMutation,
  useEmailVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useLogInOtpMutation,
} = api;
export default api;

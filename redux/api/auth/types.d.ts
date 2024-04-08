type LogInRequest = {
  emailOrUsername: string;
  password: string;
  next: string;
};

type LogInResponse = {
  redirectUrl: string;
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  next: string;
};

type RegisterResponse = {
  redirectUrl: string;
};

type LogOutRequest = {
  next: string;
};

type LogOutResponse = {
  redirectUrl: string;
};

type EmailVerificationRequest = {
  code: string;
};

type EmailVerificationResponse = {
  success: boolean;
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

type ResetPasswordRequest = {
  identificationToken: string;
  password: string;
};

type ResetPasswordResponse = {
  message: string;
};

type SendOtpRequest = {
  email: string;
};

type SendOtpResponse = {
  email: string;
};

type LogInOtpRequest = {
  email: string;
  otp: string;
  next: string;
};

type LogInOtpResponse = {
  redirectUrl: string;
};

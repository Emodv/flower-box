enum ResponseStatus {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  UnauthorizedCredentials = 403,
  UnexpectedError = 500,
  Redirect = 301
}

enum ResponseMessages {
  Success = "Operation successful",
  InvalidCredentials = "Invalid email or password",
  UserAlreadyExists = "User already exists",
  verifiedOTP = "OTP verified and user updated",
  UnexpectedError = "an unexpected error occured",
  Redirect = "user redirect"
}

export { ResponseStatus, ResponseMessages };

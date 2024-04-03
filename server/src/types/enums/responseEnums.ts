enum ResponseStatus {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  Redirect = 301,
}

enum ResponseMessages {
  Success = "Operation successful.",
  Created = "Resource created successfully.",
  BadRequest = "The request could not be understood by the server due to malformed syntax.",
  Unauthorized = "Authentication is required and has failed or has not yet been provided.",
  Forbidden = "Insufficient permissions",
  NotFound = "The requested resource could not be found but may be available again in the future.",
  MethodNotAllowed = "A request was made of a resource using a request method not supported by that resource.",
  Conflict = "A request conflict occurred with the current state of the resource.",
  InternalServerError = "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  NotImplemented = "The server does not support the functionality required to fulfill the request.",
  BadGateway = "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
  ServiceUnavailable = "The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.",
  GatewayTimeout = "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
}

export { ResponseStatus, ResponseMessages };

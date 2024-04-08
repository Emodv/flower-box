import { Request, Response, NextFunction } from "express";
import { ResponseMessages, ResponseStatus } from "../types/enums/responseEnums";

const isAuthorized = (requiredRoles?: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    console.log(request.user, "user");
    if (!request.user || !request.user.email) {
      return response
        .status(ResponseStatus.Unauthorized)
        .send("Invalid session");
    }

    if (requiredRoles) {
      // Ensure the user has a role
      if (!request.user.role) {
        return response
          .status(ResponseStatus.Forbidden)
          .send(ResponseMessages.Forbidden);
      }

      // Checking for required role
      if (!requiredRoles.includes(request.user.role)) {
        return response
          .status(ResponseStatus.Forbidden)
          .send(ResponseMessages.Forbidden);
      }
    }
    next();
  };
};

export default isAuthorized;

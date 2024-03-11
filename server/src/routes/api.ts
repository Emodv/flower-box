import { Router } from "express";
const Api1 = Router();

import helloRouter from "./hello/hello.router";
import authentication from "./authentication/authentication.router";
import oauthAuthentication from "./authentication/oauth/oauth.router";
import protectedRouter from "./protected/protected.router";
import adminRouter from "./admin/admin.router";
// import stripeRouter from "./stripe/stripe.router";

import isAuthorized from "../middlewares/requireUser";
import { Roles } from "../enums/rolesEnum";

Api1.use("/hello", helloRouter);
Api1.use("/authentication", authentication);
Api1.use("/authentication/oauth", oauthAuthentication);
Api1.use("/protected", protectedRouter);
Api1.use("/admin", isAuthorized([Roles.ADMIN]), adminRouter);
// Api1.use("/stripe", stripeRouter);

export = Api1;

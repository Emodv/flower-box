import { Router } from "express";
const AuthenticationRouter = Router();

import {
  signupHandler,
  loginHandler,
  logoutHandler,
} from "../../controller/authentication/authentication.controller";

AuthenticationRouter.post("/sign-up", signupHandler);
AuthenticationRouter.post("/login", loginHandler);
AuthenticationRouter.post("/admin/login", loginHandler);
AuthenticationRouter.get("/logout", logoutHandler);

export default AuthenticationRouter;

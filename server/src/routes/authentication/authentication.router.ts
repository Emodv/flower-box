import { Router } from "express";
const awsRouter = Router();

import {
  signupHandler,
  loginHandler,
  logoutHandler,
} from "../../controller/authentication/authentication.controller";

// signup-handler
awsRouter.post("/sign-up", signupHandler);

//login handler-handler
awsRouter.post("/login", loginHandler);

awsRouter.post("/logout", logoutHandler);

export default awsRouter;

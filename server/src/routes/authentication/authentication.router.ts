import { Router } from "express";
const awsRouter = Router();

import {
  signupHandler,
  loginHandler,
  logoutHandler,
} from "../../controller/authentication/authentication.controller";

awsRouter.post("/sign-up", signupHandler);
awsRouter.post("/login", loginHandler);
awsRouter.post("/logout", logoutHandler);

export default awsRouter;

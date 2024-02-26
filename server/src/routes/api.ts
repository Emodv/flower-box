import { Router } from "express";
const Api1 = Router();

import helloRouter from "./hello/hello.router";
import authentication from "./authentication/authentication.router";
import protectedRouter from "./protected/protected.router";
// import stripeRouter from "./stripe/stripe.router";

Api1.use("/hello", helloRouter);
Api1.use("/authentication", authentication);
Api1.use("/protected", protectedRouter);
// Api1.use("/stripe", stripeRouter);

export = Api1;

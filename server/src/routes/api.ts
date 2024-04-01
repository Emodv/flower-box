import { Router } from "express";
const Api1 = Router();

import helloRouter from "./hello/hello.router";
import authentication from "./authentication/authentication.router";
import oauthAuthentication from "./authentication/oauth/oauth.router";
import protectedRouter from "./protected/protected.router";
import productsRouter from "./products/products.router";
import orderRouter from "./order/order.router";
// import stripeRouter from "./stripe/stripe.router";

Api1.use("/hello", helloRouter);
Api1.use("/authentication", authentication);
Api1.use("/authentication/oauth", oauthAuthentication);
Api1.use("/protected", protectedRouter);
Api1.use("/products", productsRouter);
Api1.use("/orders", orderRouter);
// Api1.use("/stripe", stripeRouter);

export = Api1;

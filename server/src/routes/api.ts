import { Router } from "express";
const Api1 = Router();

import helloRouter from "./hello/hello.router";
import authentication from "./authentication/authentication.router";
import protectedRouter from "./protected/protected.router";
import productsRouter from "./products/products.router";
import orderRouter from "./order/order.router";
import interactionRouter from "./interaction/interaction.router";
import transactionsRouter from "./transactions/transactions.router";

Api1.use("/health", helloRouter);
Api1.use("/protected", protectedRouter);
Api1.use("/authentication", authentication);
Api1.use("/products", productsRouter);
Api1.use("/transactions", transactionsRouter);
Api1.use("/orders", orderRouter);
Api1.use("/interactions", interactionRouter);

export = Api1;

import { Router } from "express";
const orderRouter = Router();

import * as orderController from "../../controller/order/order.controller";

orderRouter.post("/create-order", orderController.createOrderController);
orderRouter.get("/payment-success", orderController.paymentSuccess);
orderRouter.get("/payment-cancelled", orderController.paymentCancelled);

export default orderRouter;

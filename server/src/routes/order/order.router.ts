import { Router } from "express";
const orderRouter = Router();

import * as orderController from "../../controller/order/order.controller";

orderRouter.post("/create-order", orderController.createOrderController);

export default orderRouter;

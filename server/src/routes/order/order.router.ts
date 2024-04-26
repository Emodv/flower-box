import { Router } from "express";
const orderRouter = Router();

import * as orderController from "../../controller/order/order.controller";
import isAuthorized from "../../middlewares/requireUser";
import { Roles } from "../../types/enums/rolesEnum";

orderRouter.post("/create-order", orderController.createOrderController);
orderRouter.get("/payment-success", orderController.paymentSuccess);
orderRouter.get("/payment-cancelled", orderController.paymentCancelled);
orderRouter.get(
  "/paginated-orders",
  isAuthorized([Roles.ADMIN]),
  orderController.getPaginatedOrders,
);
orderRouter.get(
  "/mark-order-complete",
  isAuthorized([Roles.ADMIN]),
  orderController.setOrderToCompleted,
);

export default orderRouter;

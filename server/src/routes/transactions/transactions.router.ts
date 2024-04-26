import { Router } from "express";

import * as transactionController from "../../controller/transactions/transactions.controller";
import { Roles } from "../../types/enums/rolesEnum";
import isAuthorized from "../../middlewares/requireUser";

const transactionsRouter = Router();

transactionsRouter.get(
  "/paginated-transactions",
  isAuthorized([Roles.ADMIN]),
  transactionController.getPaginatedTransactions,
);

export default transactionsRouter;

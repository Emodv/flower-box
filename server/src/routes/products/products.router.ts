import { Router } from "express";
const productsRouter = Router();

import { upload } from "../../config/multer.config";
import adminController from "../../controller/products/products.controller";
import { Roles } from "../../enums/rolesEnum";
import isAuthorized from "../../middlewares/requireUser";

productsRouter.post(
  "/add-product",
  isAuthorized([Roles.ADMIN]),
  upload.array("files"),
  adminController.uploadProduct,
);

productsRouter.get(
  "/get-paginated-products",
  adminController.getProductsHandler,
);

export default productsRouter;

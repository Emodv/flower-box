import { Router } from "express";

import { upload } from "../../config/multer.config";
import * as adminController from "../../controller/products/products.controller";
import { Roles } from "../../types/enums/rolesEnum";
import isAuthorized from "../../middlewares/requireUser";

const productsRouter = Router();

productsRouter.post(
  "/add-product",
  isAuthorized([Roles.ADMIN]),
  upload.array("files"),
  adminController.uploadProduct,
);

productsRouter.get(
  "/get-paginated-products",
  adminController.getPaginatedProducts,
);

productsRouter.get("/product/:productId", adminController.getProduct);

productsRouter.get(
  "/delete-product/:productId",
  isAuthorized([Roles.ADMIN]),
  adminController.deleteProduct,
);

productsRouter.post(
  "/products-by-category",
  adminController.getProductsByCategories,
);

productsRouter.get("/products-by-interaction", adminController.getTopProducts);

export default productsRouter;

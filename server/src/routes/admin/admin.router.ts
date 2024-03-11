import { Router } from "express";
const adminRouter = Router();

import { upload } from "../../config/multer.config";
import adminController from "../../controller/admin/admin.controller";

adminRouter.post(
  "/add-product",
  upload.array("files"),
  adminController.uploadProduct,
);

export default adminRouter;

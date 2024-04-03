import { Router } from "express";
const protectedRouter = Router();

import protectedController from "../../controller/protected/protected.controller";
import isAuthorized from "../../middlewares/requireUser";
import { Roles } from "../../types/enums/rolesEnum";

protectedRouter.get("/", isAuthorized(), protectedController.sayHello);
protectedRouter.get(
  "/admin",
  isAuthorized([Roles.ADMIN]),
  protectedController.sayHelloAdmin,
);

export default protectedRouter;

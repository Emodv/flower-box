import { Router } from "express"
const protectedRouter = Router();

import protectedController from "../../controller/protected/protected.controller"

protectedRouter.get("/", protectedController.sayHello);

export default protectedRouter
import { Router } from "express";
const helloRouter = Router();

import helloController from "../../controller/hello/hello.controller";

helloRouter.get("/", helloController.sayHello);

export = helloRouter;

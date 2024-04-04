import { Router } from "express";
const interactionRouter = Router();

import * as interactionController from "../../controller/interaction/interaction.controller";

interactionRouter.get("/count", interactionController.count);

export default interactionRouter;

import { Router } from "express";

import GoogleAuthController from "../../../controller/authentication/oauth/google.controller";
import FacebookAuthController from "../../../controller/authentication/oauth/facebook.controller";

const oAuthRouter = Router();

const googleAuthController = new GoogleAuthController();
const facebookAuthController = new FacebookAuthController();

// oAuth google
oAuthRouter.get("/google", (request, response) =>
  googleAuthController.redirectToGoogleAuth(request, response),
);
//callback
oAuthRouter.get("/google/callback", (request, response) =>
  googleAuthController.handleGoogleCallback(request, response),
);

// oAuth facebook
oAuthRouter.get("/facebook", (request, response) =>
  facebookAuthController.redirectToFacebookAuth(request, response),
);
//callback
oAuthRouter.get("/facebook/callback", (request, response) =>
  facebookAuthController.handleFacebookCallback(request, response),
);

export default oAuthRouter;

import { Request, Response } from "express";
import axios from "axios";

import { setUserCookies } from "../helper";
import { findOrCreateUser } from "../../../model/authencation/oauth/oauth.model";
import {
  ResponseStatus,
  ResponseMessages,
} from "../../../types/enums/responseEnums";
import { UserType } from "@prisma/client";

class GoogleAuthController {
  private clientId: string = process.env.GOOGLE_CLIENT_ID!;
  private clientSecret: string = process.env.GOOGLE_CLIENT_SECRET!;
  private redirectUri: string = `${process.env.REDIRECT_URI}/google/callback`;

  public async redirectToGoogleAuth(
    request: Request,
    response: Response,
  ): Promise<void> {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=email profile`;
    response.status(ResponseStatus.Redirect).redirect(authUrl);
  }

  public async handleGoogleCallback(
    request: Request,
    response: Response,
  ): Promise<void> {
    const authorizationCode = request.query.code as string;
    try {
      const authorizationToken = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code: authorizationCode,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
          grant_type: "authorization_code",
        },
      );

      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${authorizationToken.data.access_token}`,
          },
        },
      );

      const user = await findOrCreateUser(
        userInfoResponse.data.email,
        UserType.GOOGLE_USER,
      );

      setUserCookies(response, user);

      response
        .status(ResponseStatus.Success)
        .send({ message: ResponseMessages.Success });
    } catch (error) {
      console.error(error, "auth-google");
      response
        .status(ResponseStatus.InternalServerError)
        .json({ message: ResponseMessages.InternalServerError });
    }
  }
}

export default GoogleAuthController;

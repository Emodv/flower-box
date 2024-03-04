import { Request, Response } from "express";
import axios from "axios";
import { findOrCreateUser } from "../../../model/authencation/oauth/oauth.model";
import { setUserCookies } from "../helper";
import { ResponseStatus, ResponseMessages } from "../../../enums/responseEnums";

class FacebookAuthController {
  private appId: string = process.env.FACEBOOK_APP_ID!;
  private appSecret: string = process.env.FACEBOOK_APP_SECRET!;
  private redirectUri: string = `${process.env.REDIRECT_URI}/facebook/callback`;

  public async redirectToFacebookAuth(
    request: Request,
    response: Response,
  ): Promise<void> {
    const authUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${this.appId}&redirect_uri=${this.redirectUri}&state={st=state123abc,ds=123456789}&scope=email`;
    response.redirect(authUrl);
  }

  public async handleFacebookCallback(
    request: Request,
    response: Response,
  ): Promise<void> {
    const code = request.query.code as string;
    try {
      const tokenResponse = await axios.get(
        `https://graph.facebook.com/v10.0/oauth/access_token`,
        {
          params: {
            client_id: this.appId,
            redirect_uri: this.redirectUri,
            client_secret: this.appSecret,
            code,
          },
        },
      );

      const userInfoResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokenResponse.data.access_token}`,
      );

      const user = await findOrCreateUser(
        userInfoResponse.data.email,
        "FACEBOOK-USER",
      );

      setUserCookies(response, user);

      response
        .status(ResponseStatus.Success)
        .send({ message: ResponseMessages.Success });
    } catch (error) {
      console.error("Error handling Facebook callback:", error);
      response
        .status(ResponseStatus.InternalServerError)
        .json({ message: ResponseMessages.InternalServerError });
    }
  }
}

export default FacebookAuthController;

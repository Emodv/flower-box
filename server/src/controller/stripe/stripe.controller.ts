// import { Request, Response } from "express";
// import { ResponseMessages, ResponseStatus } from "../../helpers/responseEnums";
// import * as stripConstructor from "./stripe.constructor";
// import * as userModel from "../../model/user/user.model";

// async function buyUserSubscription(request: Request, response: Response) {
//   try {
//     //@ts-ignore
//     const { userId } = request.user;
//     const { subscriptionType } = request.body;

//     const session = await stripConstructor.getSubscription(
//       userId,
//       subscriptionType
//     );

//     return response
//       .status(ResponseStatus.Success)
//       .json({ message: ResponseMessages.Success, url: session.url });
//   } catch (error: any) {
//     return response.status(ResponseStatus.UnexpectedError).json({
//       message: ResponseMessages.UnexpectedError,
//       error: error.message,
//     });
//   }
// }

// async function paymentSuccess(request: Request, response: Response) {
//   try {
//     const sessionId = request.query.session_id as string;

//     console.log(sessionId, "paymentSuccess-sessionId");
//     const session = await stripConstructor.checkoutSession(sessionId);
//     console.log(session, "paymentSuccess-session");

//     await userModel.updateUserStripeStatus(session);

//     response
//       .status(ResponseStatus.Redirect)
//       .redirect(process.env.CLIENT_SERVER + "/user/dashboard");
//   } catch (error) {
//     console.log(error, "paymentSuccess-error");
//     response
//       .status(ResponseStatus.ServerError)
//       .send("Error in processing payment success.");
//   }
// }

// async function paymentCancelled(request: Request, response: Response) {
//   return response
//     .status(ResponseStatus.Redirect)
//     .redirect(process.env.CLIENT_SERVER + "/user/dashboard");
// }

// export { buyUserSubscription, paymentSuccess, paymentCancelled };

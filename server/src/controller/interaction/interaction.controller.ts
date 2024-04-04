import * as interactionModel from "../../model/interaction/interaction.model";
import { Request, Response } from "express";
import {
  ResponseMessages,
  ResponseStatus,
} from "../../types/enums/responseEnums";

export async function count(request: Request, response: Response) {
  try {
    const productIdParam = request.query.interaction;

    if (typeof productIdParam !== "string" || isNaN(Number(productIdParam))) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid or missing productId" });
    }

    const productId = Number(productIdParam);

    await interactionModel.updateOrCreateProductInteraction(productId);

    return response.status(ResponseStatus.Success).json({
      mesasge: ResponseMessages.Success,
    });
  } catch (error) {
    console.error("Error processing payment success:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: "Failed to process payment success" });
  }
}

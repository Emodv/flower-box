import { Request, Response } from "express";
import { createOrder } from "../../model/orders/orders.model";
import { ResponseMessages, ResponseStatus } from "../../enums/responseEnums";

async function createOrderController(request: Request, response: Response) {
  try {
    const { address, orderItems } = request.body;

    if (!address || !orderItems || orderItems.length === 0) {
      return response.status(ResponseStatus.BadRequest).json({
        message:
          "Missing order details. Total price, address, and order items are required.",
      });
    }

    const newOrder = await createOrder({ address, orderItems });

    return response
      .status(ResponseStatus.Created)
      .json({ message: ResponseMessages.Created, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export { createOrderController };

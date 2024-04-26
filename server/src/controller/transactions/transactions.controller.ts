import { Request, Response } from "express";
import * as transactionModel from "../../model/transaction/transaction.model";
import {
  ResponseMessages,
  ResponseStatus,
} from "../../types/enums/responseEnums";
import { TransactionStatus } from "@prisma/client";

export async function getPaginatedTransactions(
  request: Request,
  response: Response,
) {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const pageSize = parseInt(request.query.pageSize as string) || 10;
    const status = request.query.status as TransactionStatus;

    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid pagination parameters." });
    }

    if (!status || !Object.values(TransactionStatus).includes(status)) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid or missing transaction status." });
    }

    const { transactions, hasMore } = await transactionModel.getTransactions({
      page,
      pageSize,
      status,
    });

    return response.status(ResponseStatus.Success).json({
      transactions,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

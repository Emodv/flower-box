import { Request, Response } from "express";

function sayHello(request: Request, response: Response): void {
  response.status(200).send("hello8");
}

export = { sayHello };

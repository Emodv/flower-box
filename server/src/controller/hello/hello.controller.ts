import { Request, Response } from "express";

function sayHello(request: Request, response: Response): void {
  response.status(200).send("hello4");
}

export = { sayHello };

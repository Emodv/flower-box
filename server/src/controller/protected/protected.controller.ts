import { Request, Response } from "express";

function sayHello(request: Request, response: Response) {
  response.status(200).send("hello from protected");
}

export = {
  sayHello,
};

import { Request, Response } from "express";

function sayHello(request: Request, response: Response) {
  response.status(200).send("hello from protected");
}

function sayHelloAdmin(request: Request, response: Response) {
  response.status(200).send("hello from protected admin");
}

export = {
  sayHello,
  sayHelloAdmin,
};

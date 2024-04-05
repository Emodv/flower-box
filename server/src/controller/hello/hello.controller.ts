import { Request, Response } from "express";

function sayHello(request: Request, response: Response): void {
  const DATABASE_URL = process.env.DATABASE_URL;
  const CLIENT_SERVER_2 = process.env.CLIENT_SERVER_2;
  const COOKIE_CLIENT = process.env.COOKIE_CLIENT;

  console.log(DATABASE_URL, "DATABASE_URL");
  console.log(CLIENT_SERVER_2, "CLIENT_SERVER_2");
  console.log(COOKIE_CLIENT, "COOKIE_CLIENT");

  response.status(200).json({
    message: "hello10",
    data: {
      DATABASE_URL,
      CLIENT_SERVER_2,
      COOKIE_CLIENT,
    },
  });
}

export = { sayHello };

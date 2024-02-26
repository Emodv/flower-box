import * as http from "http";
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import prisma from "./prisma";

const PORT = process.env.PORT || 4000;

const httpServer: http.Server = http.createServer(app);

async function startServer(): Promise<void> {
  httpServer.listen(PORT, () => {
    console.log("Server is listening on", PORT);
  });
}

startServer();

httpServer.on("close", async () => {
  await prisma.$disconnect();
});

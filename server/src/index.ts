import express, { Express, Request, Response } from "express";
import { albumRouter } from "./router/album";
import { fileRouter } from "./router/file";

const app: Express = express();
const port = 8080;

app.listen(port, () => {
  console.log(`[server]: Running at <https://localhost>:${port}`);
});

app.use("/album", albumRouter);
app.use("/file", fileRouter);

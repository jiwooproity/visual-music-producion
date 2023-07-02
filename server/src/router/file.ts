import express, { Response, Request, Router } from "express";
export const fileRouter: Router = express.Router();

fileRouter.get("/", (req: Request, res: Response) => {
  res.json({
    status: res.statusCode,
    message: "Hello, Router is File",
  });
});

import express, { Request, Response, Router } from "express";
export const albumRouter: Router = express.Router();

albumRouter.get("/", (req: Request, res: Response) => {
  res.json({
    status: res.statusCode,
    message: "Hello, Router is Album",
  });
});

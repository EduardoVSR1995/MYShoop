import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function postProducts(req: Request, res: Response) {
  res.send("Em produção").status(httpStatus.OK)
}
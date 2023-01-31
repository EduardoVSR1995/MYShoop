import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function postProducts(req: Request, res: Response) {
  res.send("Em produção").status(httpStatus.OK);
}

export async function postProductsCart(req: AuthenticatedRequest, res: Response) {
  try {
    const { id, quantiti } = req.body;
    const userId = req.userId;

    await productService.creatCart(id, userId, quantiti);  

    res.sendStatus(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

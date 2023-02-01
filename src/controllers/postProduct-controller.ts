import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares";
import fretProduct from "@/services/LibCorreio-service";

export async function postfret(req: Request, res: Response) {
  try {

    const fret = await fretProduct(req.body);

    res.send(fret).status(httpStatus.OK);  
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
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

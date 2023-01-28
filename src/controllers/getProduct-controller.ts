import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function listProducts(req: Request, res: Response) {
  const shoop = req.baseUrl.split("/")[1];
  try {
    const list = await productService.listProduct(shoop);
    
    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function searchProduct(req: Request, res: Response) {
  const productName = req.params.productName as string;
  try {
    const list = await productService.listProductName(productName);
    
    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function searchProductId(req: Request, res: Response) {
  try {
    const productName = Number(req.params.productId) as number;
    const list = await productService.listProductId(productName);
    
    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function cardProducts(req: AuthenticatedRequest, res: Response) {
  try {
    const list = await productService.findManyProductCardUserId(req.userId);
    
    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function publiProduct(req: Request, res: Response) {
  try {
    const shoop = req.baseUrl.split("/")[1];
    const list = await productService.findFirstPubli(shoop);
    
    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

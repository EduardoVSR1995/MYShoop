import { Request ,Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";

export async function listProducts(req: Request, res: Response){
    const shoop = req.baseUrl.split("/")[1]
    try {
        const list = await productService.listProduct(shoop)
        
        res.send(list).status(httpStatus.OK)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}

export async function searchProduct(req: Request, res: Response){
    const productName = req.params.productName as string
    try {
        const list = await productService.listProductName(productName)
        
        res.send(list).status(httpStatus.OK)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}

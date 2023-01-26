import { Request ,Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";

export async function listProducts(req: Request, res: Response){
    try {
        const list = await productService.listProduct()
        
        res.send(list).status(httpStatus.OK)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }

}
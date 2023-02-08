import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares";
import fretProduct from "@/services/libCorreio-service";
import userService from "@/services/user-service";
import storeRepositoy from "@/repositories/store-repository";

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

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deletProductsCart(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await productService.deleteCart(Number(id), userId);

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deletProductStore(req: AuthenticatedRequest, res: Response) {
  try {
    const shoop = req.baseUrl.split("/")[1];

    const { id } = req.params;
    const userId = req.userId;

    await userService.autorize(userId, shoop);

    await productService.deleteProductStore(Number(id), shoop);

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function categoryProducts(req: AuthenticatedRequest, res: Response) {
  try {      
    const shoop = req.baseUrl.split("/")[1];

    const userId = req.userId;

    await userService.autorize(userId, shoop);
    const list = await productService.findManyCategory(shoop);   

    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function creatProducts(req: AuthenticatedRequest, res: Response) {
  try {      
    const {
      category,
      name,
      url,
      creatCategory,
      description,
      price,
      packingSize } = req.body;

    const shoop = req.baseUrl.split("/")[1];

    const userId = req.userId;

    await userService.autorize(userId, shoop);

    const store = await storeRepositoy.findFirsName(shoop);

    const data = {
      name,
      description,
      packingSize,
      StoreId: store.id,
      price: Number(price),
      CategoriId: Number(category),
    };

    if( creatCategory ) {
      const cate = await productService.creatCategory({ StoreId: store.id, name: creatCategory});
      data["CategoriId"] = cate.id;
    }
    const product = await productService.creatProduct(data);   

    await productService.creatUrlImage(product.id, url);

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    console.log(error);

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}


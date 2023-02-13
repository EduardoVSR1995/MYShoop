import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "@/services/user-service";
import { AuthenticatedRequest } from "@/middlewares";
import productService from "@/services/product-service";

export async function signUpUser(req: Request, res: Response) {
  try {
    const url = req.baseUrl.split("/")[1];
   
    const user = await userService.creatUser(req.body, url);  
    
    res.send(user).status(httpStatus.OK);
  } catch (error) {
    if(error.name === "NotFoundError" ) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const url = req.baseUrl.split("/")[1];
  
    const token = await userService.signinUser(req.body, url);
  
    res.send(token).status(httpStatus.OK);
  } catch (error) {
    if(error.name === "NotFoundError" ) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function autorize(req: AuthenticatedRequest, res: Response) {
  try {
    const url = req.baseUrl.split("/")[1];

    const { userId } = req;

    const boolean = await userService.autorize(userId, url);  
    res.send(boolean).status(httpStatus.OK)  
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function creatShoop(req: Request, res: Response) {
  try {
    const obj= {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password ,
      urlImage: req.body.url,
      phone: req.body.phone,
      street: req.body.street,
      city: req.body.city,
      house: Number(req.body.homeNumber),
      postOfficeCode: Number(req.body.cep),
      nameStore: req.body.nameShop,
    }
    const user = await userService.creatShoopUser(obj);
     
    res.send(user).status(httpStatus.OK);
  } catch (error) {
    if(error.name === "NotFoundError" ) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getSold(req: AuthenticatedRequest, res: Response) {
  try {
    const url = req.baseUrl.split("/")[1];

    const { userId } = req;

    await userService.autorize(userId, url);  

    const list = await productService.findSoldProducts(url);
    res.send(list).status(httpStatus.OK)  
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

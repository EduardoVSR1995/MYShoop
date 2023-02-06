import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "@/services/user-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function signUpUser(req: Request, res: Response) {
  try {
    const url = req.baseUrl.split("/")[1];
    
    console.log(url, req.body);
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

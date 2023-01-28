import { Request ,Response } from "express";
import httpStatus from "http-status";
import userService from "@/services/user-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function signUpUser(req: Request, res: Response){
  const { email } = req.body;
  try {
      await userService.findFirstUserMail(email);
      
      const token = await userService.creatUser(req.body);  

      res.send(token).status(httpStatus.OK);
  } catch (error) {
      if(error.name === "NotFoundError" ) return res.status(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export async function signin(req: Request, res: Response){
  try {
      const token = await userService.signinUser(req.body);  

      res.send(token).status(httpStatus.OK);
  } catch (error) {
      if(error.name === "NotFoundError" ) return res.status(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export async function autorize(req: AuthenticatedRequest, res: Response){
  try {
      const { userId } = req
      const token = await userService.autorize(userId);  

      res.send(token).status(httpStatus.OK);
  } catch (error) {
      if(error.name === "NotFoundError" ) return res.status(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}
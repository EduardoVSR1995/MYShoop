import { Request, Response } from "express";
import httpStatus from "http-status";
import { shoops } from "@/config";
import { AuthenticatedRequest } from "@/middlewares";
import storeRepositoy from "@/repositories/store-repository";
import userService from "@/services/user-service";

export async function allShoop(req: Request, res: Response) {
  try {      
    const list = await shoops();

    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function advertising(req: AuthenticatedRequest, res: Response) {
  try {      
    const { text, id} = req.body;
   
    const url = req.baseUrl.split("/")[1];
   
    const userId = req.userId;

    await userService.autorize(userId, url);

    const publi = await storeRepositoy.findFirsAdvers(url);

    await storeRepositoy.upsertAdvers(publi.Publi.length > 0? publi.Publi[0].id : 0  , { text, StoreId: publi.id , productId: id});

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    console.log(error)
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function creatAfiliat(req: AuthenticatedRequest, res: Response) {
  try {      
    const { cellPhone, email } = req.body;
   
    const url = req.baseUrl.split("/")[1];
   
    const userId = req.userId;

    await userService.autorize(userId, url);

    const code = await userService.creatAfiliat( Number(cellPhone), email, url);

    res.send({code: code}).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAllAfiliat(req: AuthenticatedRequest, res: Response) {
  try {         
    const url = req.baseUrl.split("/")[1];
   
    const userId = req.userId;

    await userService.autorize(userId, url);

    const list = await userService.getAllAfiliat(url);

    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}


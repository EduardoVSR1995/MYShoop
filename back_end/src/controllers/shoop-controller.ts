import { Request, Response } from "express";
import httpStatus from "http-status";
import { shoops } from "@/config";
import { AuthenticatedRequest } from "@/middlewares";
import storeRepositoy from "@/repositories/store-repository";

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
    console.log(req.body)    

    const publi = await storeRepositoy.findFirsAdvers(url);

    console.log(publi);
    await storeRepositoy.upsertAdvers(publi.Publi.length > 0? publi.Publi[0].id : 0  , { text, StoreId: publi.id , productId: id});

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    console.log(error)
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}


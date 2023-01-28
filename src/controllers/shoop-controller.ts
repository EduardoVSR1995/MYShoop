import { Request ,Response } from "express";
import httpStatus from "http-status";
import { shoops } from "@/config";

export async function allShoop(req: Request, res: Response){
  try {      
    const list = await shoops()
    res.send(list).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

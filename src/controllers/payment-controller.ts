import { Response, Request } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentPix from "@/services/libPix";

export async function postPayment(req: Request, res: Response) {
  try {
    const { id, quantiti } = req.body;
    //const userId = req.userId;
    const url = req.baseUrl.split("/")[1];
    //console.log(id, userId, quantiti, url)
    const payment =  await paymentPix(id, 1, quantiti, url);  

    res.send(payment).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

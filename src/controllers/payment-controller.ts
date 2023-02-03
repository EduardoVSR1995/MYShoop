import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import pixService from "@/services/pix-service";
import fretProduct from "@/services/libCorreio-service";

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { id, quantiti, cep } = req.body;

    const userId = req.userId;

    const url = req.baseUrl.split("/")[1];
  
    const fret = await fretProduct({ id: id, sCepDestino: cep, quantiti: quantiti });
    
    const payment = await pixService.paymentPix( 
      parseInt((fret[0].Valor).replace(",", "")),
      id,
      userId,
      quantiti,
      url
    );  

    res.send({ imgQrcod: payment.imgQrcod }).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

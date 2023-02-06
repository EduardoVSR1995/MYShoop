import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import pixService from "@/services/pix-service";
import fretProduct from "@/services/libCorreio-service";
import paymentService from "@/services/payment-service";
import userRepository from "@/repositories/user-repositoy";
import userService from "@/services/user-service";

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

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;

    const url = req.baseUrl.split("/")[1];

    const user = await userService.autorize(userId, url);
    
    console.log(url, user);
    if( !user ) return res.sendStatus(httpStatus.UNAUTHORIZED);
 
    const product = await paymentService.listPayment(url);

    res.send(product).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

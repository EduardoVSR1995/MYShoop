import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import pixService from "@/services/pix-service";
import fretProduct from "@/services/libCorreio-service";
import paymentService from "@/services/payment-service";
import userService from "@/services/user-service";

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const {  id, phone, quantiti, street, city, house, cep } = req.body;

    const UserId = req.userId;

    const url = req.baseUrl.split("/")[1];

    const fret = await fretProduct({ id: id, sCepDestino: cep, quantiti: quantiti });
    const addres = {
      phone,
      street,
      city,
      house: Number(house),
      postOfficeCode: Number(cep),
      UserId
    };

    const payment = await pixService.paymentPix( 
      parseInt((fret[0].Valor).replace(",", "")),
      id,
      UserId,
      quantiti,
      url,
      addres
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

    await userService.autorize(userId, url);
    
    const product = await paymentService.listPayment(url);

    res.send(product).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updatCodePayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { id, code, send } = req.body;
    const userId = req.userId;

    const url = req.baseUrl.split("/")[1];

    await userService.autorize(userId, url);

    await paymentService.updatCodePayment(id, code, send);

    res.send([]).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayment, postPayment, updatCodePayment } from "@/controllers/payment-controller";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .post("/pix", postPayment)
  .get("/list", getPayment)
  .patch("/code", updatCodePayment)

export { paymentRouter };

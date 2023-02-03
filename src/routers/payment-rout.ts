import { Router } from "express";
import { createUserSchema, signinUserSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { postPayment } from "@/controllers/payment-controller";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .post("/pix", postPayment)

export { paymentRouter };

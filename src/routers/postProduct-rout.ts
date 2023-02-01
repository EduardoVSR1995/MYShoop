import { postfret, postProductsCart } from "@/controllers";
import { validateBody, authenticateToken } from "@/middlewares";
import { creatUserSchema, fretUserSchema } from "@/schemas";
import { Router } from "express";

const productsRoute = Router();

productsRoute
  .post("/fret", validateBody(fretUserSchema), postfret)
  .post("/cart", validateBody(creatUserSchema), authenticateToken, postProductsCart);
export { productsRoute };

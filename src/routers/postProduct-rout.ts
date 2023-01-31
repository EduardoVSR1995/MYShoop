import { postProducts, postProductsCart } from "@/controllers";
import { validateBody, authenticateToken } from "@/middlewares";
import { creatUserSchema } from "@/schemas";
import { Router } from "express";

const productsRoute = Router();

productsRoute
  .post("/", postProducts)
  .post("/cart", validateBody(creatUserSchema), authenticateToken, postProductsCart);
export { productsRoute };

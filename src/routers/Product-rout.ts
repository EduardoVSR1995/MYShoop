import { Router } from "express";
import { cardProducts, listProducts, searchProduct, searchProductId } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const productsRoute = Router();

productsRoute
  .get("/", listProducts)
  .get("/search/:productName", searchProduct)
  .get("/id/:productId", searchProductId)
  .get("/cart", authenticateToken, cardProducts)
  
export { productsRoute };

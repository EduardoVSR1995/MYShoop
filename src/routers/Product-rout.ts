import { Router } from "express";
import { listProducts, searchProduct, searchProductId } from "@/controllers";

const productsRoute = Router();

productsRoute
  .get("/", listProducts)
  .get("/:productName", searchProduct)
  .get("/id/:productId", searchProductId)
  
export { productsRoute };

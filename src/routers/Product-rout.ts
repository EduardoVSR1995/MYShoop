import { Router } from "express";
import { listProducts, searchProduct } from "@/controllers";

const productsRoute = Router();

productsRoute
  .get("/", listProducts)
  .get("/:productName", searchProduct)
  
export { productsRoute };

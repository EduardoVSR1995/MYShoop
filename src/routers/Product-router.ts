import { Router } from "express";
import { listProducts } from "@/controllers";

const productsRoute = Router();

productsRoute
  .get("/", listProducts);
  
export { productsRoute };

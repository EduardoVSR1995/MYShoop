import { postProducts } from "@/controllers";
import { Router } from "express";

const productsRoute = Router();

productsRoute
  .post("/", postProducts)
  
export { productsRoute };

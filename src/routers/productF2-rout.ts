import { listProducts, postfret, publiProduct, searchProduct, searchProductId } from "@/controllers";
import { validateBody } from "@/middlewares";
import { fretUserSchema } from "@/schemas";
import { Router } from "express";

const productsRoute = Router();

productsRoute
  .get("/", listProducts)
  .get("/publi", publiProduct)
  .get("/search/:productName", searchProduct)
  .get("/id/:productId", searchProductId)
  .post("/fret", validateBody(fretUserSchema), postfret);
  
export { productsRoute };

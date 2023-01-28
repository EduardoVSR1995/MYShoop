import { cardProducts, listProducts, publiProduct, searchProduct, searchProductId } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { productsRoute } from "./postProduct-rout copy";

productsRoute
  .get("/", listProducts)
  .get("/search/:productName", searchProduct)
  .get("/id/:productId", searchProductId)
  .get("/cart", authenticateToken, cardProducts)
  .get("/publi", publiProduct);
  
export { productsRoute };

import { cartProducts, listProducts, publiProduct, searchProduct, searchProductId } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { productsRoute } from "./postProduct-rout";

productsRoute
  .get("/", listProducts)
  .get("/search/:productName", searchProduct)
  .get("/id/:productId", searchProductId)
  .get("/publi", publiProduct)
  .get("/cart", authenticateToken, cartProducts);
  
export { productsRoute };

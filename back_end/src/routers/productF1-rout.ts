import { cartPaydProducts, cartProducts, categoryProducts, creatProducts, deletProductsCart, deletProductStore, postProductsCart } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { creatUserSchema } from "@/schemas";
import { productsRoute } from "./productF2-rout";

productsRoute
  .all("/*", authenticateToken)
  .get("/cart", cartProducts)
  .get("/category", categoryProducts)
  .get("/cart/payd", cartPaydProducts)
  .post("/create", creatProducts)
  .post("/cart", validateBody(creatUserSchema), postProductsCart)
  .delete("/remov/:id", deletProductsCart)
  .delete("/remov/store/:id", deletProductStore)
  ;
  

export { productsRoute };

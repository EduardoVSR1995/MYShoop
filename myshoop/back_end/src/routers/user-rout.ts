import { Router } from "express";
import { createUserSchema, signinUserSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { autorize, creatAfiliat, getAllAfiliat, getSold, signin, signUpUser } from "@/controllers";

const usersRouter = Router();

usersRouter
  .post("/signup", validateBody(createUserSchema), signUpUser)
  .post("/signin", validateBody(signinUserSchema), signin)
  .all("/*", authenticateToken)
  .get("/autorize", autorize)
  .post("/afiliat", creatAfiliat)
  .get("/afiliat", getAllAfiliat)
  .get("/sold", getSold);

export { usersRouter };

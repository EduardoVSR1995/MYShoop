import { Router } from "express";
import { createUserSchema, signinUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { autorize, signin, signUpUser } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/signup", validateBody(createUserSchema), signUpUser)
  .post("/signin", validateBody(signinUserSchema), signin)
  .post("/signin", validateBody(signinUserSchema), signin)
  .get("/autorize", autorize)

export { usersRouter };

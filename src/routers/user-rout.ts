import { Router } from "express";
import { createUserSchema, signinUserSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { autorize, signin, signUpUser } from "@/controllers";

const usersRouter = Router();

usersRouter
  .post("/signup", validateBody(createUserSchema), signUpUser)
  .post("/signin", validateBody(signinUserSchema), signin)
  .get("/autorize", authenticateToken, autorize);

export { usersRouter };

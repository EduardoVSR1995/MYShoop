import { Router } from "express";
import { createUserSchema, signinUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { signin, signUpUser } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), signUpUser);
usersRouter.post("/", validateBody(signinUserSchema), signin);

export { usersRouter };

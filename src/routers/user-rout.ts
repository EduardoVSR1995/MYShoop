import { Router } from "express";
import { createUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { signUpUser } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), signUpUser);

export { usersRouter };

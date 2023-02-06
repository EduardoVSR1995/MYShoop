import { Router } from "express";
import { allShoop } from "@/controllers/shoop-controller";

const storeRoute = Router();

storeRoute
  .get("/", allShoop);

export { storeRoute };

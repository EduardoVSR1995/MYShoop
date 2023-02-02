import express, { Express } from "express";
import { connectDb, disconnectDB, loadEnv, shoops } from "@/config";
import cors from "cors";

loadEnv();

import {
  productsRoute, usersRouter, storeRoute
} from "@/routers";
import { postPayment } from "./controllers/payment-controller";

export default async function app() {
  const shoop = await shoops();

  const server = express();
  for(let i=0; i < shoop.length; i++) {
    server
      .use(cors())
      .use(express.json())
      .use("/store", storeRoute)
      .get(`/${shoop[i].nameStore}/check`, postPayment)
      .use(`/${shoop[i].nameStore}/product`, productsRoute)
      .use(`/${shoop[i].nameStore}/user`, usersRouter);    
  }
  return server; 
}

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app());
}
  
export async function close(): Promise<void> {
  await disconnectDB();
}
 

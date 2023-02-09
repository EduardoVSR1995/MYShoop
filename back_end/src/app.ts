import express, { Express } from "express";
import { connectDb, disconnectDB, loadEnv, shoops } from "@/config";
import cors from "cors";

import {
  productsRoute, usersRouter, storeRoute, paymentRouter
} from "@/routers";
import { creatShoop } from "./controllers";

loadEnv();

const service = express();

export { service };

export default async function app() {
  const shoop = await shoops();

  service
      .use(cors())
      .use(express.json())
      .use("/store", storeRoute)
      .post("/user/creat", creatShoop);

  for(let i=0; i < shoop.length; i++) {
    service
      .get(`/${shoop[i].nameStore}/check`, (req, res) => res.send("OK") )
      .use(`/${shoop[i].nameStore}/user`, usersRouter)
      .use(`/${shoop[i].nameStore}/product`, productsRoute)
      .use(`/${shoop[i].nameStore}/payment`, paymentRouter);    
  }; 
}

export async function init(): Promise<Express> {
  connectDb();
  await app();
  return service;
}
  
export async function close(): Promise<void> {
  await disconnectDB();
}
 

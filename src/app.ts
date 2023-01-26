import express, { Express } from "express";
import { connectDb, disconnectDB, loadEnv } from "@/config";
import cors from "cors";

loadEnv()

import {
  productsRoute
} from "@/routers";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/check", (req, res) => res.send("OK"))
  .use("/product", productsRoute)

export async function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }
  
  export async function close(): Promise<void> {
    await disconnectDB();
  }
  
  export default app;
  
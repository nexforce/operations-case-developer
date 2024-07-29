import express, { Express } from "express";
import appRouter from "./routes/index.routes";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(appRouter);

export { app };
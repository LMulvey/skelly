import cors from "cors";
import express, { type Express } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { healthRouter } from "./routes/health";
import { itemsRouter } from "./routes/items";

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/health", healthRouter);
app.use("/items", itemsRouter);

// This should be last
app.use(errorHandler);

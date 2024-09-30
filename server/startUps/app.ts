import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import { NextFunction, Request, Response } from "express";
import globalErrorHandler from "../errorsHandlers/errorHandler";
import { mountedRoutes } from "./routes";
import { readFileSync } from "fs";

const app = express();

const __dirname = path.resolve();


// Read Swagger JSON files
const swaggerDocument = JSON.parse(
  readFileSync(path.join(__dirname, './swagger/swagger.json'), 'utf8')
);

// Swagger route for users
app.use('/LMS', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// SET Security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan("dev"));

// Limit request from the same IP address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in an hour",
});
app.use("/api", limiter);

// The body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// The cookie parser; for handling sending cookie to the frontend
app.use(cookieParser());

// The cross origin resource sharing
const corOptions = cors({
  //   origin: process.env.ORIGIN,
  origin: ["http://localhost:3000"],
  credentials: true,
});
app.use(corOptions);

mountedRoutes(app);


app.all("*", (req: Request, res: Response, next: NextFunction) =>
{
  const err: any = new Error(`Can't find ${req.originalUrl} in this server!`);
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);

export default app;

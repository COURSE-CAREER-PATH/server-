import dotenv from "dotenv";
dotenv.config();

import express, { Application, Express } from "express";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";
import swaggerDocs from "./utils/swagger";

// Initialize the app
const app: Application = express();

const corsOptions: CorsOptions = {
  origin: [
    process.env.CLIENT_NAME as string,
    process.env.LOCAL_CLIENTNAME as string,
  ],
};

app.use(cors(corsOptions));

// Adjusting data limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//get routes
import userRoute from "./routes/userRoute";

//use routes
app.use("/user", userRoute);

// Server and MongoDB setup
const URL = process.env.DB_URL as string;

mongoose
  .connect(URL)
  .then(() => console.log("Connected to COURSE_CAREER_PATH DB"))
  .catch((err: Error) => console.error("MongoDB connection error db:", err));

// Server setup
const PORT = process.env.PORT ? Number(process.env.PORT) : 5500;

app.listen(PORT, () => {
  console.log(`COURSE_CAREER_PATH SERVER IS LIVE ON PORT ${PORT}`);

  // Initialize Swagger documentation
  swaggerDocs(app as Express, PORT);
});

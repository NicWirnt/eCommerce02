import "dotenv/config";
import express from "express";

const app = express();

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
const PORT = process.env.PORT || 8000;

//USE OF MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Configure the server MONGODB CONNECT
import { dbCon } from "./src/config/config.js";
dbCon();

//Use the router
import adminRouter from "./src/routes/adminRouter.js";
app.use("/api/v1/admin", adminRouter);

//FIRST URL
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "You reached the admin API",
  });
});

// Error Handlling
app.use((error, req, res, next) => {
  res.status(error.status || 400);

  res.json({
    status: "error",
    message: error.message,
  });
});

//Bound the app with the port to serve on INTERNET
app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Server is running on http://localhost${PORT}`);
});

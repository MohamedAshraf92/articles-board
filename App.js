import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => console.log(error));

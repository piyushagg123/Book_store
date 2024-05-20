import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

app.use(cors()); //allow all origins

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("WELCOME");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`hello ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

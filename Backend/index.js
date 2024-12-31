import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());


//Middleware for handling CORS policy
//To allow Custom origins
app.use(cors({
    origin:'http//localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-type'],
}));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use('/books', booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

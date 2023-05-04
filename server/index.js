import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";

// data imports
import User from "./models/User.js";

import { dataUser } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;
mongoose
  .connect("mongodb+srv://nadine:Nad123456@cluster0.20yvffr.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ONLY ADD DATA ONE TIME */
   
    //User.insertMany(dataUser);
    //tna7ilha l comment mra kho wtrj3haa ? hdhy t3ml insert data f wst lbase 
    //chof tw ki bch n3wed nrestarti bch y7ot data  ctrl + s save 
  })
  .catch((error) => console.log(`${error} did not connect`));

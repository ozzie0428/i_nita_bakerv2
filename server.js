require('dotenv/config')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")
const routes = require("./routes");


const app = express();

const router = express.Router();

app.use(express.json());
app.use(router);
app.use(cors())
app.use("/api", routes);
const port = process.env.PORT || 5000;
const mongodb = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI:"mongodb://localhost/shoppinglist"
mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("mongodb connected");
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch(() => {
    console.log(error.message);
  });

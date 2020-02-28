require('dotenv/config')
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");


const app = express();

const router = express.Router();

app.use(express.json());
app.use(router);
app.use("/api", routes);
const port = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost/shoppinglist", {
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

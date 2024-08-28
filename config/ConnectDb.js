require("dotenv").config();
let mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connection established");
  })
  .catch((err) => {
    console.log(`error : ${err}`);
  });

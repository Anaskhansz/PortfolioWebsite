require("./config/ConnectDb");
let dotenv = require("dotenv");
let path = require("path");
dotenv.config();
let express = require("express");
let cors = require("cors");
const authRouter = require("./routers/AuthRoutes");
const emailRouter = require("./routers/EmailRoutes");
let app = express();
let PORT = 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/email", emailRouter);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

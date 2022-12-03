const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const express = require("express");
const databaseConnect = require("./config/database");
const authMiddleware = require("./middlewares/authMiddleware");
const authRouter = require("./routes/authRoute");
const app = express();
app.use(cookieParser);
config();
app.get("/", (req, res) => {
  console.log("hello");
});
databaseConnect();
// app.use("api/messenger", authRouter);
app.listen(process.env.PORT, () => {
  console.log("App is connect to port " + process.env.PORT);
});

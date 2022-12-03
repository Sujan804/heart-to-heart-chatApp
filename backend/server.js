// const { config } = require("dotenv");
// const express = require("express");
// const databaseConnect = require("./config/database");
// const cookieParser = require("cookie-parser");
// const authMiddleware = require("./middlewares/authMiddleware");
// const authRouter = require("./routes/authRoute");
// const bodyParser = require("body-parser");
// const messengerRoute = require("./routes/messengerRoute");
// const app = express();

// app.use(cookieParser());
// app.use(bodyParser.json());
// config();
// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
//   console.log("hello");
// });
// databaseConnect();
// app.use("api/messenger", authRouter);
// // app.use("api/messenger", messengerRoute);
// app.listen(process.env.PORT, () => {
//   console.log("App is connect to port " + process.env.PORT);
// });

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");
const messengerRoute = require("./routes/messengerRoute");

dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", authRouter);
app.use("/api/messenger", messengerRoute);

app.get("/", (req, res) => {
  res.send("ok");
});

databaseConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

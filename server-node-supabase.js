const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const ip = require("ip");
const RESPONSE_CODES = require("./constants/RESPONSE_CODES");
const RESPONSE_STATUS = require("./constants/RESPONSE_STATUS");
const authRouter = require("./routes/auth/authRouter");
const app = express();
dotenv.config({ path: path.join(__dirname, "./.env") });

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/test", authRouter)


app.all("*", (req, res) => {
  res.status(RESPONSE_CODES.NOT_FOUND).json({
    statusCode: RESPONSE_CODES.NOT_FOUND,
    httpStatus: RESPONSE_STATUS.NOT_FOUND,
    message: "Route non trouvé",
    result: [],
  });
});
const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} - Server is running on : http://${ip.address()}:${port}/`
  );
});

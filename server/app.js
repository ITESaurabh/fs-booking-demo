const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json()); // for parsing application/json

app.use(cors());
// app.use(express.urlencoded({ extended: false  }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const hotelRouter = require("./routes/v1/hotels");
const authRouter = require("./routes/v1/auth");
const bookingRouter = require("./routes/v1/booking");

app.use("/auth", authRouter);
app.use("/hotels", hotelRouter);
app.use("/booking", bookingRouter);

app.listen(8000);

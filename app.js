const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

const port = 8080;

const connect = () => {
  mongoose
    .connect("mongodb://localhost/shopping-demo-plus")
    .catch((err) => console.error(err));
};

connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);
app.use(express.static("assets"));

app.listen(port, () => {
  console.log(port, "서버가 켜졌습니다.");
});

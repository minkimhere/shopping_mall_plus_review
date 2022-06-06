const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
const router = express.Router();

const port = 8080;

const connect = () => {
  mongoose
    .connect("mongodb://localhost/shopping-demo-plus")
    .catch((err) => console.error(err));
};

connect();

router.post("/users", async (req, res) => {
  const { nickname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
    });
  }

  const existUser = await User.find({ $or: [{ nickname }, { email }] });

  if (existUser.length) {
    return res.status(400).json({
      errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
    });
  }

  const user = new User({ email, nickname, password });
  await user.save();

  res.status(201).json({});
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);
app.use(express.static("assets"));

app.listen(port, () => {
  console.log(port, "서버가 켜졌습니다.");
});

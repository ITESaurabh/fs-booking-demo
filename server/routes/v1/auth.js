const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var db = require("../../database");

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "select * from users where email = ? and password = ?";
  let params = [email, password];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      const token = generateAccessToken({ email: email, id: row.id });
      res.json({
        success: true,
        data: {
          token,
          user: row,
        },
        message: "Login Success",
      });
    } else {
      res.json({
        success: false,
        data: null,
        message: "Authentication failed. User not found.",
      });
    }
  });
});

// db.close();
module.exports = router;

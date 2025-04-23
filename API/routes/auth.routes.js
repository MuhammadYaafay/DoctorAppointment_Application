const express = require("express");
const {
  register,
  login,
  getProfile,
  logout
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  regiserValidation,
  loginValidation,
} = require("../middlewares/validateRequest.middleware");

const router = express.Router();

router.post("/register", regiserValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", verifyToken, getProfile);
router.post("/logout", verifyToken, logout);

module.exports = router;

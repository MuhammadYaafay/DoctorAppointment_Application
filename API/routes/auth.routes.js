const express = require("express");
const {
  register,
  login,
  getProfile,
  logout,
  updateProfile,
  updateProfilePicture
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  regiserValidation,
  loginValidation,
} = require("../middlewares/validateRequest.middleware");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/register", regiserValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", verifyToken, getProfile);
router.post("/logout", verifyToken, logout);
router.put('/updateProfile', verifyToken, updateProfile);
router.post(
  "/profilePicture",
  verifyToken,
  upload.single("profilePicture"),
  updateProfilePicture
);

module.exports = router;

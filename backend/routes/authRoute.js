const express = require("express");
const { signUp, login } = require("../controllers/authController");
const { body } = require("express-validator");
const { signinRequired, isAdmin } = require("../middlewares/authMiddle");

const router = express.Router();

// ROUTING

//creating new user -  signup
router.post(
  "/createuser",
  [
    body("name", "Name is required and At least 3 character").isLength({
      min: 3,
    }),
    body("email", "Email is required and must be valid").isEmail(),
    body("phone", "Phone number is required and must be valid").isLength({
      min: 10,
      max: 10,
    }),
    body("password", "Password is required and At least 6 character").isLength({
      min: 6,
    }),
    body("address", "Address is required").isLength({ min: 3 }),
  ],
  signUp
);

//login user
router.post(
  "/login",
  [
    body("email", "Email is required and must be valid").isEmail(),
    body("password", "Password is required and At least 6 character").isLength({
      min: 6,
    }),
  ],
  login
);

//protected route for user
router.get("/user-auth", signinRequired, (req, res) => {
  res.status(200).json({ ok: true });
});

//protected route for admin

router.get("/admin-auth", signinRequired, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = router;

const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/logout").get(authController.logout);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/resetPassword").post(authController.resetPassword);

module.exports = router;

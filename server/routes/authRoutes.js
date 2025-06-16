// rute za login logout, register

const express = require("express");
// const {register, login, logout}=require("../controllers/AuthController");
const {register, login, check, logout}=require("../../controllers/authController");
const router = express.Router();
const verifyToken=require("../middleware/AuthMiddleware") // exportujemo ceo onaj token



router.post("/register", register);
router.post("/login", login);
router.post("/check", verifyToken, check)
router.post("/logout", logout);

module.exports=router;
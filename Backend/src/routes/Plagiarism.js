const express=require("express");
const userMiddleware = require("../middleware/usermiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {CheckPlagiarism,getallplagiarismreports}=require("../controllers/plagiarism");
const prouter=express.Router();

prouter.post("/check-all",adminMiddleware,CheckPlagiarism);
prouter.get("/reports",adminMiddleware,getallplagiarismreports)
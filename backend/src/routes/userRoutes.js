const express = require("express");
const { registerUser ,VerfiyEmail, updateUser , deleteUser , getUsers, loginUser ,resetPassword} = require("../controllers/userController"); 

const router = express.Router();

router.post("/register", registerUser);
router.post("/verifyEmail",VerfiyEmail);

router.post("/login",loginUser);

router.post("/resetpassword", resetPassword); 

router.put("/update-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUser);

router.get("/get-user/:id?", getUsers);



module.exports = router;

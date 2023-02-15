const sendEmail = require("../utils/email");
const Token = require("../utils/token");
const { User, validate } = require("../models/user");
const crypto = import("crypto");
const express = require("express");
const router = express.Router();


router.use(express.urlencoded())

router.get('/login', (req, res) => {
    // console.log("Login get");
    res.render("/home/saurabh/Node-Basics/email-verify/views/login.html");
});

router.post('/login', async (req, res) => {

    const password= req.body.password
    const remail=req.body.email
    console.log(remail);

    const user= await User.findOne(
        { email: remail, password:password },
    );

    // console.log(req.body);
    if(!user){
        res.render("/home/saurabh/Node-Basics/email-verify/views/login.html",{ errors: "User not registered" });
    }
    else if(user && user.verified){
        // console.log("inside user");
        console.log(remail);
        const currToken = Token.createToken(remail);
        console.log(currToken);
        res.cookie("access_token",currToken,{
            httpOnly:true
        });
        res.render("/home/saurabh/Node-Basics/email-verify/views/item_homepage.html",{ msg: "Login Successfullly" });
    }
    else if(user && !user.verified){
        res.render("/home/saurabh/Node-Basics/email-verify/views/login.html",{ errors: "User is not verified" });
    }
    else{
        res.render("/home/saurabh/Node-Basics/email-verify/views/login.html",{ errors: "Wrong password" });
    }
});

router.get("/logout", (req, res) => {

    console.log("In logout");

    res.clearCookie("access_token");
    res.status(200);
    res.render('item_homepage.html',{ msg: "Logout Successfully" });

});

module.exports = router;

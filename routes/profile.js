const sendEmail = require("../utils/email");
const Token = require("../models/token");
const { User, validate } = require("../models/user");
const crypto = import("crypto");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Email = require("../models/email");



router.use(express.urlencoded())


router.get('/profile',async (req,res)=>{

    const curr_token = req.cookies.access_token;

    if (!curr_token) {
        return res.render('item_homepage.html');
    }
    var decoded=jwt.decode(curr_token);
    // console.log(decoded);
    const curr_email= decoded.user_email;
    // console.log(curr_email);      
    const user= await User.findOne({ email: curr_email });

    const emails=await Email.find({ email: curr_email });
    // console.log(emails);

    res.render('profile.html',{
        form:{
            user
        },
        email:{
            emails
        }

    }
    );
})

router.get('/emaildata/:id',async (req,res)=>{
    // console.log("Inside emailData");
    console.log(req.params.id);
    const email = await Email.findOne({ _id: req.params.id });

    // console.log(email.email);

    // console.log(email.type);
    // console.log(email._id);
    if(email.type=="Response"){
        res.render("response.html",{
            user: email.emailData
        })
    }
    else{
        res.render("welcome.html",{
            user: email.emailData
        }) 
    }

           

    
})

module.exports = router;

const sendEmail = require("../utils/email");
const Token = require("../models/token");
const { User, validate } = require("../models/user");
const crypto = import("crypto");
const express = require("express");
const router = express.Router();
const Email = require("../models/email");
const jwt = require('jsonwebtoken');

let nunjucks=require('nunjucks')

router.use(express.urlencoded())

router.get('/form',async (req,res)=>{

    const curr_token = req.cookies.access_token;
    
    // console.log("inside postform ", curr_token);

    if (!curr_token) {
        return res.render('item_homepage.html');
    }
    var decoded=jwt.decode(curr_token);
    // console.log(decoded);
    const curr_email= decoded.user_email;
    console.log(curr_email);      
    const user= await User.findOne({ email: curr_email });

    res.render('forms.html',{
        form:{
            user
        }}
    );
})


router.post('/form',async (req,res)=>{

    const {name,email,company,designation,technology,location} = req.body;
    // console.log("inside post form",email);
    // const user = getUserFromEmail(email)
    const user= await User.findOne({ email: email });

    // console.log("company is",company);
    // console.log("before user set",user);

    user.set({
        companyName:company,
        designation:designation,
        technologyWorkingOn: technology,
        companyLocation:location
    })
    await user.save()

    const message=nunjucks.render("/home/saurabh/Node-Basics/email-verify/views/response.html",{user:user});

    await sendEmail(email, "Your Response", message);

    

    let emailBody = await new Email({
        email:user.email,
        type: "Response",
        emailData: {
            name: user.name,
            email: user.email,
            companyName:company,
            designation:designation,
            technologyWorkingOn:technology,
            companyLocation:location
        }
    }).save();


    let tot=user.totalMailSent+1;
    await User.updateOne({ email: email },{$set:{totalMailSent:tot}});

    // user.totalMailSent=user.totalMailSent+1;
    // res.send("Form completed, Responses has been sent on your email!")
    res.render("item_homepage.html");
});


module.exports = router;






















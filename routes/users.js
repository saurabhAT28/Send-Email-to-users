const sendEmail = require("../utils/email");
const Token = require("../models/token");
const token1 = require("../utils/token");
const { User, validate } = require("../models/user");
const crypto = import("crypto");
const express = require("express");
const Email = require("../models/email");
const router = express.Router();


router.use(express.urlencoded())


router.post("/register", async (req, res) => {
    // console.log(req.body);
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user)
            res.render("/home/saurabh/Node-Basics/email-verify/views/home.html",{ errors: "User Exist Already" });
        else{
            user = await new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).save();
    
            // console.log("Before token")
            const curr_token=token1.createToken(req.body.email);
            let token = await new Token({
                userId: user._id,
                token: curr_token
            }).save();
    
            // console.log("After token")
            const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
            // const message = `/verify/${user.id}/${token.token}`;
            console.log(message);
            await sendEmail(user.email, "Verify Email", message);
    
            let emailBody = await new Email({
                email:user.email,
                type: "Welcome",
                emailData: {
                    name: req.body.name,
                    email: req.body.email
                }
            }).save();
     
            let tot=user.totalMailSent+1;
            await User.updateOne({ email: user.email },{$set:{totalMailSent:tot}});
    
            // res.send("An Email sent to your account please verify");
            res.render("/home/saurabh/Node-Basics/email-verify/views/login.html",{ msg: "Email sent to your registered email" });
        }

    } catch (error) {
        // res.status(400).send("An error occured");
        res.render("/home/saurabh/Node-Basics/email-verify/views/login.html",{ errors: "An error occured" });
        console.log(error);
    }
});

router.get("/api/user/verify/:id/:token", async (req, res,next) => {
    // console.log("Inside verify api");
    // console.log(res.body);
    // console.log(req.body);
    try {
        // console.log("Inside try");
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        // console.log(token.userId)
        if (!token) return res.status(400).send("Invalid link");
        
        await Token.findByIdAndRemove(token._id);

        await User.updateOne({_id: user._id},{$set:{verified:true}});

        try {
            return res.render("/home/saurabh/Node-Basics/email-verify/views/login.html", { msg: "Successfully Verified" });
        }
        catch {
            res.send("Not redirecting to login page");
        }
    } catch (error) {
        res.status(400).send("An error occured");
        console.log(error);
    }
});

router.get('/register', async(req, res, next) => {
    res.render("/home/saurabh/Node-Basics/email-verify/views/home.html"); 
});

router.get('/', (req, res, next) => {
    res.render('/home/saurabh/Node-Basics/email-verify/views/item_homepage.html')
});


module.exports = router;











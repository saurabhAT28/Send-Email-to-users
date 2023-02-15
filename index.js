require("dotenv").config();
const user = require("./routes/users");
const login=require("./routes/login");
const form=require("./routes/form");
const myProfile=require("./routes/profile");
const connection = require("./db");
const express = require("express");
const cookieParser=require("cookie-parser");
const app = express();

(async () => await connection())();

app.use(express.json());
app.use(cookieParser());

var path=require('path')
let nunjucks=require('nunjucks');
const { profile } = require("console");
app.set("view engine","html")
nunjucks.configure(['views/'],{
    autoescape: false,
    express: app
});



app.get("/", user);
app.get("/register", user);
app.get("/api/user/verify/:id/:token",user);
app.post("/register",user);

app.get("/item_homepage", user);

app.get("/login",login);
app.post("/login",login);
app.get("/logout",login);

app.get("/form",form);
app.post("/form",form);

app.get("/profile",myProfile);
app.get("/emaildata/:id",myProfile);



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const express = require('express')

let path = require('path');


const SECRET = process.env.JWT_TOKEN
const demo = process.env.demo


function createToken(user_email){
    // console.log(SECRET);
    const token = jwt.sign(
        { user_email }, SECRET, { expiresIn: '1d' }
    ); 
    console.log(SECRET);
    return token;      
}

function getEmailFromToken(token){
    const payload=jwt.decode(token)
    return payload.email
}


module.exports = {"createToken":createToken, "getEmailFromToken":getEmailFromToken}
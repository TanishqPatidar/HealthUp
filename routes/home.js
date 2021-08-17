const express = require('express');
const router = express.Router();
const path = require("path");
const jwt = require('jsonwebtoken');
const config = require('config');
const {User} = require('../models/user');



// at the home page we only want to handle the get  request because at this api nothing need to be posted or deleted.

router.get('/',async (req,res)=>{
    //send the static page from the static directory where all the static files have been put.
    //check if the user is logged in or not
    if (!req.cookies.token) { //checking that user is already logged in or not
        res.sendFile(path.join(__dirname,'../public/main.html'),(err)=>{
            if(err){
                res.writeHead(404);
                res.end(" file not found");
            }
        });        
    } else { //if user has token then decoding and giving access
        const decoded = jwt.verify(req.cookies.token,config.get('jwtPrivateKey'))
        req.user = decoded;
        const user =await User.findById(decoded._id).select({name:1,_id:0})
        res.render('index',{ user : user.name});
    }
    
})

module.exports = router;
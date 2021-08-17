const express = require('express'); // framework gfor creating the web app consist of various HTTP modules 
const Joi = require('joi') //for validation of 
const bcrypt = require('bcrypt');   //to unhash the passwords
const {User} = require('../models/user'); //object destructuring feature will acquire thhe User model in User and validateuser function in validate.
const auth = require("../middleware/auth");
const router = express.Router();


router.post('/', async (req,res) => {
    const { error } = validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send('invalid username or password.');
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('invalid username or password.');

    const token =await user.generateAuthtoken(res, user._id);
    res.cookie('token', token, {
    expires: new Date(Date.now() +  '1d'), //token will expire in 1 day.
    secure: false, // set to true if your using https
    httpOnly: true,});
    res.redirect('/index');
});
router.get('/',auth,async (req,res)=>
{
    res.clearCookie('token') 
    res.redirect("/index")
})




function validate(req) {
    const schema = Joi.object({
        email : Joi.string().min(5).max(50).required().email(),
        password : Joi.string().min(5).max(1024).required()
    })
    return schema.validate(req);
}
module.exports = router;


///////authentication module completely made.

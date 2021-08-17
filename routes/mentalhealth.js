const express = require("express"); 
const router = express.Router();
const {Disorder} = require('../models/disorder');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin")
const {User} = require('../models/user');
const _ = require('lodash')
//need to define the schema for the mental health also as we need to query the documens from here only.

router.use(express.static('files'))
// handling the get request for diseases.
router.get("/",auth,async (req, res) => {
  const dname = await Disorder.find().select({name:1, _id : 0})
  var mydata = []; 
  dname.filter(obj =>mydata.push(obj.name)  );
  const user =await User.findById(req.user).select({name:1,_id:0})
  res.render('mental',{name: mydata ,user: user.name});
});
  
router.get("/:name",auth,async(req, res) => {
const name = req.params.name;
const data = await Disorder.findOne({name:name})
//const user = await User.findById(req.user._id).select({name:1,_id:0})
//data.user = user.name;
//console.log(data,user)
res.render('mentaldata',data);

});

router.post("/",[auth,admin],async(req,res)=>{
  try{
    disorder = new Disorder(_.pick(req.body, ['name','symptoms','treatment','diet','not_diet'])) 
    await disorder.save();
    res.redirect('/mentalhealth');

  }
  catch(ex)
        {
            res.status(500).send("internal server error");
        }
})


module.exports = router; 

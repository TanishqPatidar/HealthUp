const express = require("express"); 
const router = express.Router();
const {Disease} = require('../models/disease');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin")
const {User} = require('../models/user');
const _ = require('lodash');
const cons = require("consolidate");
const { func } = require("joi");

router.use(express.static('files'))
// handling the get request for diseases.
router.get("/",auth,async (req, res) => {
    const dname = await Disease.find().select({name:1, _id : 0})
    var mydata = []; 
    dname.filter(obj =>mydata.push(obj.name)  );
    const user =await User.findById(req.user._id).select({name:1,_id:0})
    res.render('disease',{name: mydata ,user: user.name});
});

router.get("/:name",auth,async (req, res) => { 
  const name = req.params.name;
  const data = await Disease.findOne({name:name})
  res.render('diseasedata',data);
})

router.post("/",[auth,admin],async(req,res)=>{
  try{
    disease = new Disease(_.pick(req.body, ['name','organ_affected','symptoms','treatment','diet','not_diet'])) 
    await disease.save();
    res.redirect('/disease');
  }
  catch(ex)
        {
            res.status(500).send("internal server error"+ex);
        }
})

module.exports = router;
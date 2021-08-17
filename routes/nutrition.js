const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express"); 
const router = express.Router();
const {Nutrient} = require('../models/nutrition');
const {User} = require('../models/user');
const _ = require('lodash');
//need to define the schema and model for the nutrition also as we need to query the documens from here only.
router.use(express.static('files'))
// handling the get request for diseases.
router.get("/",auth,async(req, res) => {
    const nname = await Nutrient.find().select({name:1, _id : 0})
    var mydata = []; 
    nname.filter(obj =>mydata.push(obj.name));
    const user =await User.findById(req.user._id).select({name:1,_id:0})
    res.render('nutrition',{name: mydata ,user: user.name}) //nutrients name array to be sent in a key value pair.
});
router.get("/:name",auth,async (req, res) => { 
  const name = req.params.name;
  const data = await Nutrient.findOne({name:name})
  res.render('nutritiondata',data);
})

router.post("/",[auth,admin],async(req,res)=>{
  try{
    nutrient = new Nutrient(_.pick(req.body, ['name','veg','nonveg'])); 
    await nutrient.save();
    res.redirect('/nutrition');

  }
  catch(ex)
        {
            res.status(500).send("internal server error");
        }
})


module.exports = router;
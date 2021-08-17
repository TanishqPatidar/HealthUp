const {User}=require('../models/user')
module.exports =async function(req,res,next){
    const user =await User.findById(req.user._id).select({isAdmin:1,_id:0})
    if(!user.isAdmin) return res.status(403).send("Access denied,you r not the admin user to add data.");
    next();
}
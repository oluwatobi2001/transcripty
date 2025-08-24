const bodyParser = require("body-parser");

const router = require('express').Router();
const {UserRouteVerification, checkIsAdmin} = require("../middleware/auth")
const Admin = require("../models/Auth/Admins");




router.get("/", UserRouteVerification,   async(req, res) => {
    try {
const adminInfo = await Admin.find();
res.status(200).json(adminInfo)
    } catch(err) {
res.status(500).json(err)
    }
}
)

router.get("/:id", UserRouteVerification,   async(req, res) =>{
    
    try {
        const myAdmin = await Admin.findById(req.params.id);
        const {password, ...others} = myAdmin._doc;
        res.status(200).json(others)

    } catch(err) {
        res.status(500).json(err)
    }
})

router.put("/:id", UserRouteVerification,  async(req, res) =>{
    
 
})
router.delete("/:id",  UserRouteVerification, checkIsAdmin, async(req, res) =>{
    const {userId} = req.params;
    try {
         const deleteUser =  await Admin.delete(userId);
    if (deleteUser) {
        ews.status(200).json({msg: "User deleted Successfully"})
    }
     
    } catch(err) {
        return res.status(500).json({err: "This action requsted could not be performed at this  time. Please try again shortly. "})

    }
  
    
})

module.exports = router;
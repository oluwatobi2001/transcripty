const bodyParser = require("body-parser");

const router = require('express').Router();
const {UserRouteVerification} = require("../middleware/auth")
const Admin = require("../models/Auth/Admins");



console.log(typeof router.get);
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
router.delete("/:id",  UserRouteVerification,  async(req, res) =>{
    
    
})

module.exports = router;
const bodyParser = require("body-parser");

const router = require('express').Router();
const verifyToken = require("../middleware/auth")
const Admin = require("../models/Auth/Admins");

router.get("/", verifyToken,   async(req, res) => {
    try {
const adminInfo = await Admin.find();
res.status(200).json(adminInfo)
    } catch(err) {
res.status(500).json(err)
    }
})

router.get("/:id", verifyToken,   async(req, res) =>{
    
    try {
        const myAdmin = await Admin.findById(req.params.id);
        const {password, ...others} = myAdmin._doc;
        res.status(200).json(others)

    } catch(err) {
        res.status(500).json(err)
    }
})

router.put("/:id", verifyToken,  async(req, res) =>{
    
    try {
        const myAdmin = await Admin.findById(req.params.id);
        const {password, ...others} = myAdmin._doc;
        res.status(200).json(others)

    } catch(err) {
        res.status(500).json(err)
    }
})
router.delete("/:id",  verifyToken,  async(req, res) =>{
    
    try {
        const myAdmin = await Admin.findById(req.params.id);
        const {password, ...others} = myAdmin._doc;
        res.status(200).json(others)

    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;
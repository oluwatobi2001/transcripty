const jwt = require('jsonwebtoken');
const Admin= require("../models/Auth/Admins");


exports.register = async(req, res, next) => {
    try {
const newAdmin = await Admin.create(req.body);
        const {id, username} = newAdmin;
        const token = jwt.sign({id, username}, process.env.SECRET);
res.status(201).json({id, username , token});

    }
    catch(err) {
        next(err);

    }
}

exports.login = async(req,res, next) => {
    try {
const user = await Admin.findOne({username : req.body.username});
const {id, username } = user;
const token = jwt.sign({id, username}, process.env.SECRET, {expiresIn: '1h'});
res.status(201).json({id, username , token});


    }
    catch(err) {
       res.status(500).json("error : Login failed")
    }
}
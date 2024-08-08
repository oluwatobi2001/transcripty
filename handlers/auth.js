const jwt = require('jsonwebtoken');
const Admin= require("../models/Auth/Admins");
const bcrypt = require("bcrypt")

exports.register = async(req, res, next) => {

    const {UserName, UserEmail, UserPassword, userRole} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.UserPassword, salt);
        const userPassword = hashedPassword;
        const userRole = req.body.userRole;
const newAdmin = await Admin.create({UserName, UserEmail, userPassword, userRole });
        const {id, username} = newAdmin;
        const token = jwt.sign({id, username}, process.env.SECRET);
res.status(201).json({id, username , token});

    }
    catch(err) {
        res.status(500).json(err)

    }
}

exports.login = async(req,res, next) => {
    
    const UserPassword = req.body.UserPassword;
    const UserName = req.body.UserName;
    
    if (!UserName || !UserPassword) {
        return res.status(400).json({ error: "Username or Password fields cannot be empty!" });
    }
    
    try {
        const loginUser = await Admin.findOne({ UserName: req.body.UserName });
        console.log(loginUser);
    
        if (!loginUser) {
            return res.status(400).json("Invalid Username. Check if it's correct");
        }
    
        console.log(loginUser.userPassword);
        console.log(UserPassword);
    
        const passwordMatch = await bcrypt.compare(UserPassword, loginUser.userPassword);
        console.log(passwordMatch);
    
        if (!passwordMatch) {
            return res.status(400).json("Incorrect password");
        }
    
        const { id, UserName } = loginUser;
        console.log(process.env.SECRET);
        const token = jwt.sign({ id, UserName }, process.env.SECRET, { expiresIn: '1h' });
        return res.status(201).json({ id, UserName, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json("error: Login failed");
    }
}    
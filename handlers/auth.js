const jwt = require('jsonwebtoken');
const Admin= require("../models/Auth/Admins");
const bcrypt = require("bcrypt")

exports.register = async(req, res, next) => {

    
    try {
        const {  userEmail, userPassword, userRole, firstName, userName, lastName} = req.body;
        console.log(userName)
 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        console.log(hashedPassword
        )
        const newAdmin = await Admin.create({ userName: userName, userEmail, userPassword : hashedPassword, userRole, firstName, lastName });
        const {id} = newAdmin;
        const userInfo = newAdmin.userName;
        const token = await jwt.sign({id, userInfo}, process.env.SECRET);
res.status(201).json({id, userName, token});

    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)

    }
}
exports.login = async (req, res, next) => {
    try {
        const { userPassword, userEmail } = req.body;

        if (!userEmail || !userPassword) {
            return res.status(400).json({ error: "Email or Password fields cannot be empty!" });
        }

        const loginUser = await Admin.findOne({ userEmail });

        if (!loginUser) {
            return res.status(400).json({ error: "Invalid Email. Check if it's correct" });
        }

        const passwordMatch = await bcrypt.compare(userPassword, loginUser.userPassword);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        // Destructure only after confirming loginUser exists
        const { id, userEmail: email } = loginUser;
        
        const token = jwt.sign({ id, email }, process.env.SECRET, { expiresIn: '1h' });

        return res.status(200).json({ id, email, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Login failed. Please try again" });
    }
};

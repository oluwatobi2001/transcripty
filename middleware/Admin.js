const express = require("express");
const Admins = require("../models/Auth/Admins");

const VerifyAdminAsDean = async(req, res, next) => {

    const UserId = req.user._id;
    const UserInfo=  await Admins.findById(UserId);
    if(!UserInfo) {
return res.status(400).json({ msg: "The service you are trying to access isn't accessible currently. Please try again later"

})
if (UserInfo.UserRole == "dean" | UserInfo.UserRole == "admin" ){
    next()
}
else {
    res.status(400).json({msg:"The service you are trying to access isn't accessible currently. Please try again later "})
}
    }
}

module.exports = {VerifyAdminAsDean}
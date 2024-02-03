


const router= require('express').Router();

const Admin = require('../models/Auth/Admins');
const handle = require('../handlers/index');

router.post('/register', handle.register);

router.post("/login", handle.login);


module.exports = router;

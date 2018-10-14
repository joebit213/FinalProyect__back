const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const uploadCloud = require("../helpers/cloudinary");
const {verifyToken} = require('../helpers/jwt')


router.get('/:id', verifyToken, (req,res,next)=>{
    User.findById(req.params.id)
    .then(user=>res.status(200).json(user))
    .catch(e=>next())
})

module.exports = router
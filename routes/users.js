const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const uploadCloud = require("../helpers/cloudinary");


router.get('/:id', (req,res,next)=>{
    User.findById(req.params.id)
    .then(user=>res.status(200).json(user))
    .catch(e=>next())
})

//edit user info
router.post("/:username", uploadCloud.single("image"), (req, res, next) => {
    const { username } = req.params;
  
    if (req.file) req.body["photoURL"] = req.file.url;
    User.findOneAndUpdate(
      { username: username },
      { $set: req.body },
      { new: true }
    )
      .then(user => {
        console.log(user);
        res.redirect(`/users/${user.username}`);
      })
      .catch(e => {
        console.log(e);
      });
  });

module.exports = router
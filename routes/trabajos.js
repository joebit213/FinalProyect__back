const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Trabajo = require('../models/Trabajo')
const {verifyToken} = require('../helpers/jwt')
const uploadCloud = require('../helpers/cloudinary')


// router.get('/private', verifyToken, (req,res,next)=>{
//   res.send("Esto sololo ven los usuarios logueados como tu " + req.user.username)
// })

//publicar 

router.post('/', verifyToken, uploadCloud.single("image"), (req,res,next) =>{
  Trabajo.create(req.body)
  .then(trabajo => {
    User.findByIdAndUpdate(req.user._id, {
      $push: { trabajo: trabajo._id }
    })
  .then(t=>{
    console.log(t)
  })
  .catch(e=>res.json(e))
  res.status(200).json(trabajo)
})
  .catch(e=>next(e))
})

//ver publicaciones

router.get('/',verifyToken, (req,res,next) =>{
  Trabajo.find()
     .then(trabajos=>{        
       res.status(200).json({trabajos})
     })
     .catch(e=>{
       next(e)
     })
})

//borramos el post

router.post('/remove',verifyToken, (req, res, next) => {
  Trabajo.findByIdAndRemove(req.body.trabajoId)
  .then(t => {
    res.status(200).json(t)
  })
  .catch(error => {
    next(error)
  })
});


module.exports = router
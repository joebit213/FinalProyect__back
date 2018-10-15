const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Trabajo = require('../models/Anuncio')
const {verifyToken} = require('../helpers/jwt')
const uploadCloud = require('../helpers/cloudinary')


// router.get('/private', verifyToken, (req,res,next)=>{
//   res.send("Esto sololo ven los usuarios logueados como tu " + req.user.username)
// })

//publicar 

router.post('/', verifyToken, uploadCloud.single("image"), (req,res,next) =>{
  req.body["user"] = req.user._id;
  if(req.file) req.body['imageURL'] = '/anuncios/' + req.file.url
  Trabajo.create(req.body)
  .then(trabajo => {
    User.findByIdAndUpdate(req.user._id, {
      $push: { anuncio: anuncio._id }
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

router.get('/anuncios', (req,res,next) =>{
  Anuncio.find()
     .then(anuncios=>{        
       res.status(200).json({anuncios})
       //console.log(trabajos)
     })
     .catch(e=>{
       //next(e)
       console.log(e)
     })
})




module.exports = router
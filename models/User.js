const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    Trabajo: [{
        type: Schema.Types.ObjectId,
        ref: 'Trabajo'
      }],
    bio: String,
    email: {
        type:String,
        required:true
    },
    photoURL: String,
    address: String,
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField:"email"})

module.exports = mongoose.model('User', userSchema)

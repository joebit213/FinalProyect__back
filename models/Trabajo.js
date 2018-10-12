const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trabajoSchema = new Schema({
    location: {
      type: {
        type: String,
        default: "Point"
      },
      address: String,
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    text: String,
    imageURL: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Trabajo", trabajoSchema);

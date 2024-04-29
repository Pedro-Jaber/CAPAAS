const mongoose = require("mongoose");
const { Schema } = mongoose;

const TagSchema = new Schema({ tag: String }, { _id: false });
const CapybaraShema = new Schema(
  {
    // Image ID as a 24-character hexadecimal string
    mimetype: String, // Mimetype: image/exemple
    size: Number, // bytes
    tags: [TagSchema],
  },
  {
    timestamps: true,
  }
);

//TODO Get image mimetype before saving
//TODO Get image size before saving

module.exports = mongoose.model("Capybara", CapybaraShema);

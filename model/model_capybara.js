const mongoose = require("mongoose");
const { Schema } = mongoose;

const TagSchema = new Schema({ tag: String }, { _id: false });
const CapybaraSchema = new Schema(
  {
    // Image ID as a 24-character hexadecimal string
    mimetype: String, // Mimetype: image/exemple
    size: Number, // size in bytes
    blob: Buffer, // Image in blob
    tags: [String],
  },
  {
    timestamps: true,
    collection: "capybaras",
  }
);

module.exports = mongoose.model("Capybara", CapybaraSchema);

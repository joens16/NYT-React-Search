// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new Schema object
// This is similar to a Sequelize model
const articleSchema = new Schema({
  // `string` must be of type String. We "trim" it to remove any trailing white space
  // `string` is a required field, and a custom error message is thrown if it is not supplied
  title: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  url: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// This creates our model from the above schema, using mongoose's model method
const articleModel = mongoose.model("Article", articleSchema);

// Export the articleModel model
module.exports = articleModel;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
);

// schema is useless so far
// need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

//make avail to Node app
module.exports = Dishes;

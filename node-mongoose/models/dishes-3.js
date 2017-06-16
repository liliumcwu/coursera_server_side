/* examining how mongoose supports sub-documents */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
);

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
    },
    comments:[commentSchema] //heh
  }, {
    timestamps: true
  }
);

// schema is useless so far
// need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

//make avail to Node app
module.exports = Dishes;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  repeat: String,
  type: String,
  value: String,
  options: {
    range: String,
    reverse: Boolean,
    badEndsOn: String,
    goodStartsOn: String,
    values: [{
      key: Number,
      label: String,
      value: Number,
      color: String
    }]
  }
});

const ModelClass = mongoose.model('question', questionSchema);

module.exports = ModelClass;

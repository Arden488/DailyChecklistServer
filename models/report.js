const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  date: Date,
  answers: [{
    label: String,
    fieldType: String,
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
  }]
});

const ModelClass = mongoose.model('report', reportSchema);

module.exports = ModelClass;

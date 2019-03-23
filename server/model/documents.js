const mongoose = require('mongoose');
const schema = mongoose.Schema({
  id: {type: String, required:true},
  name: {type: String, required:true},
  url: {type: String}
});

module.exports = mongoose.model('Document', schema);

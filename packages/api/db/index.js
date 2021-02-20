const mongoose = require('mongoose');
const config = require('../config').mongodb;
mongoose.connect(config.url, config.options);
module.exports = mongoose;

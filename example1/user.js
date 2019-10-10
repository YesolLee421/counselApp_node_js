const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: String,
    pw: String,
    salt: String,
    name: String,
    type: Number,
});
module.exports = mongoose.model('User',userSchema);
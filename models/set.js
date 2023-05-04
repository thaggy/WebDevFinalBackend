const mongoose = require('mongoose')

const setSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    set: [
        {answer: String, question: String}
    ]
});

module.exports = mongoose.model('set', setSchema);
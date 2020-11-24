const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    date: { type : Date, default: Date.now },    
    text: {type: String, required: true},
    id: {type: String, required: true}
});

module.exports = mongoose.model('Note', noteSchema);
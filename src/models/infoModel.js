const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please fill the title']
    },
    type: {
        type: String,
        required: [true, 'Please fill the type'],
        enum: ['college', 'section', 'major']
    },
    code: {
        type: Number,
        required: [true, 'Please fill the code']
    },
    infoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Info',
        default: null
    },
    infosId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Info'
    }]
    
},{
    timeStamps: true
});

module.exports = mongoose.models.Info || mongoose.model('Info', infoSchema);
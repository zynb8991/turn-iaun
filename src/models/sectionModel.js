const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Please fill the userId']
    },
    infoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Info",
        required: [true, 'Please fill the infoId']
    } 
    
},{
    timeStamps: true
});

module.exports = mongoose.models.Section || mongoose.model('Section', sectionSchema);
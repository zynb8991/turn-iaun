const mongoose = require('mongoose');

const userTurnSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Please fill the userId']
    },
    startHour: {
        type: Number,
        required: [true, 'Please fill the startHour']
    },
    endHour: {
        type: Number,
        required: [true, 'Please fill the endHour']
    },
    day: {
        type: Number,
        required: [true, 'Please fill the day']
    }
    
},{
    timeStamps: true
});

module.exports = mongoose.models.UserTurn || mongoose.model('UserTurn', userTurnSchema);
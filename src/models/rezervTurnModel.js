const mongoose = require('mongoose');

const rezervTurnSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Please fill the userId']
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Please fill the teacherId']
    },
    hourTurn: {
        type: Number,
        required: [true, 'Please fill the hourTurn']
    },
    dayTurn: {
        type: String,
        required: [true, 'Please fill the dayTurn']
    },
    status: {
        type: Number,
        required: [true, 'Please fill the status']
    },
    date: {
        type: Number,
        required: [true, 'Please fill the date']
    }

},{
    timeStamps: true
});

module.exports = mongoose.models.RezervTurn || mongoose.model('RezervTurn', rezervTurnSchema);
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
        required: [true, 'Please fill the sectionId']
    },
    dateTurn: {
        type: Date,
        required: [true, 'Please fill the dateTurn']
    },
    status: {
        type: Number,
        required: [true, 'Please fill the status'],
        default: 0
    }

},{
    timeStamps: true
});

module.exports = mongoose.models.RezervTurn || mongoose.model('RezervTurn', rezervTurnSchema);
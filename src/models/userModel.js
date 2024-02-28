const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\u0600-\u06FF\s]+$/.test(v);
            },
            message: props => "FuulName is not valid"
        },
        required: [true, 'Please fill the fullName']
    },
    email: {
        type: String,
        required: [true, 'Please fill the email'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]+([\.]?[a-zA-Z0-9]+)*@[a-zA-Z]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})+$/.test(v);
            },
            message: props => "Email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, 'Please fill the passowrd']
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        required: [true, "Please fill the role"]
    },
    personnelCode: {
        type: Number,
        required: function() {
            return this.role === 'teacher';
        }
    },
    tempcode: Number,
    active: {
        type: Number,
        default: 1
    }
},{
    timeStamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
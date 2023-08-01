const mongoose = require('mongoose');

//it is schema for the user
// it contain two arrays, one tell the person to which i have to review, 
//and other will contain the list of reviews, whick the person hed recived.

const UserSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    },
    isAdmin: {
        type: 'Boolean',
        required: false
    },
    userToReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviewRecivedFrom: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
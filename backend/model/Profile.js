const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avtar:{
        type:String,
        default:'https://i.pinimg.com/originals/2b/e0/1d/2be01dad0db3765405a80ed28044770f.jpg'
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    icon:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        default: "from-fuchsia-500 to-fuchsia-600",
    }
})

module.exports = mongoose.model('Card', CardSchema);
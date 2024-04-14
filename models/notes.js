const mongoose = require('mongoose')

const notesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    creation_at:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports=mongoose.model('note',notesSchema)
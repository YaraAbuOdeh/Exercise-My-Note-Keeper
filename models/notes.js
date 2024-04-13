const mongoose = require('mongoose')

const notesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Content:{
        type:String,
        required:true
    },
    noteDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports=mongoose.model('note',notesSchema)
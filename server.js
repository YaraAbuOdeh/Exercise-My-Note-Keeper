require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const database=mongoose.connection
database.on('error',(error)=>console.error(error))
database.once('open',()=>console.log('connected dataBase'))

app.use(express.json())

const notesRouter=require('./routes/notes')
app.use('/notes',notesRouter)
app.listen(process.env.PORT||3000,()=>console.log('server started'))



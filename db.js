const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://yusufm423:NavedYusuf1@cluster0.ucsbe.mongodb.net/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Succesfully")
    })
}

module.exports = connectToMongo
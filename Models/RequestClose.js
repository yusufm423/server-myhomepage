import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reqCloseSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    room_no:{
        type: String,
    },
    reason:{
        type: String
    },
    meal:{
        type: String
    }    

});

const reqclose = mongoose.model('reqclose', reqCloseSchema)
export default reqclose
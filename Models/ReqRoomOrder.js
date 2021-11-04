import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reqOrderSchema = new Schema({
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

const reqorder = mongoose.model('reqorder', reqOrderSchema)
export default reqorder
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Feedback = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    room_no:{
        type: String,
    },
    message:{
        type: String
    }
});

const feedback = mongoose.model('feedback', Feedback)
export default feedback
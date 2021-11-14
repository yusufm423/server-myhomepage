import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DelieverSchema = new Schema({
    room_no:{
        type: String,
    },
    meal:{
        type: String
    },    
    date:{
        type:String
    },
    email:{
        type:String
    },
    id:{
        type:String
    }

});

const Delieveries = mongoose.model('Delieveries', DelieverSchema)
export default Delieveries
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProfileImage = new Schema({
   
    email:{
        type:String
    },
    image:{
        type:String
    }

});

const images = mongoose.model('Images', ProfileImage)
export default images
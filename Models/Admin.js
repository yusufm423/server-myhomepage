import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone_no:{
        type: String
    },
    profile_pic:{
        type: String
    }    

});

const Admin = mongoose.model('admin', AdminSchema)
export default Admin
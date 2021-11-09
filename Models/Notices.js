import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoticeSchema = new Schema({
    heading:String,
    Date:{
        type:String,
        default:"",
    },
    file:String
});

const Notices = mongoose.model('notices', NoticeSchema)
export default Notices
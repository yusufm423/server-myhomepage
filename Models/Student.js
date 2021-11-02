import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StudentSchema = new Schema({
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
    enrollment_no:{
        type: String,
        required: true
    },
    faculty_no:{
        type: String,
        required: true
    },
    room_no:{
        type: Number
    },
    hostel_name:{
        type: String
    },
    phone_no:{
        type: Number
    },
    payment_history:{
        type: String,
    },
    dining_status:{
        type: String
    },
    course_name:{
        type: String
    },
    course_year:{
        type: String
    },
    profile_pic:{
        type: String
    }    

});

const Student = mongoose.model('student', StudentSchema)
export default Student
/*
name:
email:
password:{
Room no.
payment history:
Dining Status:
Enrollment no.:
phone no.:
faculty no.
hostel name:
course name:
year no.:
profile pic: */
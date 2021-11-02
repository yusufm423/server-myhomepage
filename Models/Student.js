const mongoose = require('mongoose')

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
        required: true,
        unique: true
    },
    faculty_no:{
        type: String,
        required: true,
        unique: true
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

export default mongoose.model('student', StudentSchema)
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
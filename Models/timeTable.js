
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const timeschema = new Schema({
  Days: {
    type: Array,
    default: [{
      name: 'Sunday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:0
    }, {
      name: 'Monday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:1
    }, {
      name: 'Tuesday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:2
    }, {
      name: 'Wednesday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:3
    }, {
      name: 'Thursday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:4
    }, {
      name: 'Friday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:5
    }, {
      name: 'Saturday',
      breakfast: "",
      lunch: "",
      dinner: "",
      count:6
    }],
  },

})

export default mongoose.model('timetable', timeschema)
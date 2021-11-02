import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import timeTable from './Routers/TimeTable.js';

const app = express();

app.use(cors())
app.use("/timetable",timeTable);


const CONNECTION_URL= 'mongodb+srv://yusufm423:NavedYusuf1@cluster0.zkhhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message))

mongoose.set('useFindAndModify',false)
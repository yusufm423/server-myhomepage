import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import timeTable from './Routers/TimeTable.js';
import authentication from './Routers/auth.js';
import requestclose from './Routers/requestClose.js';
import notice from './Routers/Notices.js';


const app = express();


app.use(bodyParser.json({limit:"30mb",extended:true }));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())

//Available routes
app.use('/api/auth', authentication)
app.use("/timetable",timeTable);
app.use('/api/req', requestclose)
app.use("/notices",notice)


const CONNECTION_URL= 'mongodb+srv://yusufm423:NavedYusuf1@cluster0.zkhhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message))


mongoose.set('useFindAndModify',false)
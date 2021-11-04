import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import timeTable from './Routers/TimeTable.js';
import authentication from './Routers/auth.js';
import requestclose from './Routers/requestClose.js';

const app = express();

app.use(express.json())

app.use(cors())

//Available routes
app.use('/api/auth', authentication)
app.use("/timetable",timeTable);
app.use('/api/req', requestclose)


const CONNECTION_URL= 'mongodb+srv://yusufm423:NavedYusuf1@cluster0.zkhhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message))


mongoose.set('useFindAndModify',false)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import timeTable from './Routers/TimeTable.js';
import authentication from './Routers/auth.js';
import requestclose from './Routers/requestClose.js';
import notice from './Routers/Notices.js';
import { createRequire } from "module";
import Student from './Models/Student.js';
import reqorder from './Models/ReqRoomOrder.js';
import Delieveries from './Models/Delieveries.js';

const app = express();
const require = createRequire(import.meta.url);
const socket = require('socket.io');

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

//Available routes
app.use('/api/auth', authentication)
app.use("/timetable", timeTable);
app.use('/api/req', requestclose)
app.use("/notices", notice)



const CONNECTION_URL = 'mongodb+srv://yusufm423:NavedYusuf1@cluster0.zkhhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false)
const server = app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
let users = []

const addUser = (userid, socketid) => {
    console.log(users)
    users = users.filter((user) => user.userId !== userid);
    users.push({ userId: userid, socketId: socketid })
    console.log(users)
}

const getUser = (userId) => users.find((user) => user.userId === userId.user)

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}
io.on('connection', (socket) => {
    socket.emit('connection', null);
    //console.log('new user connected');
    //console.log(socket.id);

    socket.on('addUser', (user) => {
        console.log("---------------------joined-------------------------")
        addUser(user, socket.id)
    }
    )
    socket.on('disconnect', () => {
        removeUser(socket.id)
        console.log("removed", socket.id)
    })
    socket.on('sendMessage', async (data) => {
        console.log(data)
        if (data.sender === 'admin1@gmail.com') {
            try {
                if (data.Accepted) {
                    const deliever = new Delieveries({
                        room_no: data.room_no,
                        meal: data.meal,
                        date: new Date(),
                        email:data.user,
                        id:data.id
                    })
                    await deliever.save()
                }
                else if(data.delievered)
                {
                   await Delieveries.findOneAndDelete({id:data.id})
                   

                //    console.log("deleted",del)
                }
                if(!data.delievered)
                await reqorder.findByIdAndDelete(data.id)

                const user1 = await Student.findOne({ email: data.user })
                data.user = `${data.user}re`
                const user = getUser(data)

                // console.log(user1.Notifications)

                if(data.delievered)
                {
                    user1.Notifications.push({
                        text:`Your ${data.meal} has been delievered`,
                        date: new Date()
                    })
                    await user1.save()
                }
                else
                {user1.Notifications.push({
                    text: data.Accepted ? `Your ${data.meal} will be served` : `Your request for ${data.meal} has been denied`,
                    date: new Date()
                })
                await user1.save()}


                console.log(user)
                if (user) {
                    if(!data.delievered)
                    {
                        io.to(user.socketId).emit('recieve',
                        {
                            text: data.Accepted ? `Your ${data.meal} will be served` : `Your request for ${data.meal} has been denied`,
                            date: new Date()
                        })
                    }
                    else
                    {
                        io.to(user.socketId).emit('recieve',
                        {
                            text: `Your ${data.meal} has been delievered`,
                            date: new Date()
                        })
                    }
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        else if (data.sender !== 'admin1@gmail.com' && data.info.RoomOrder) {
            const info = data.info
            const request = new reqorder({
                name: info.name,
                email: data.sender, room_no: info.room_no, reason: info.reason,
                meal: data.meal, date: new Date()
            })
            console.log(Date(), request)
            await request.save()
            const user = getUser(data)
            console.log(user)
            if (user) {
                io.to(user.socketId).emit('recieve', {
                    name: info.name,
                    email: data.sender, room_no: info.room_no, reason: info.reason,
                    meal: data.meal, date: new Date(), _id:request._id
                })
            }
        }
    })
})



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import timeTable from "../../Routers/TimeTable.js";
import authentication from "../../Routers/auth.js";
import requestclose from "../../Routers/requestClose.js";
import notice from "../../Routers/Notices.js";
import { createRequire } from "module";
import Student from "../../Models/Student.js";
import reqorder from "../../Models/ReqRoomOrder.js";
import Delieveries from "../../Models/Delieveries.js";
import AllData from "../../Routers/AllStud.js";
import student from "../../Models/Student.js"
import images from "../../Routers/Images.js";
import close from "../../Routers/close.js";
import serverless from "serverless-http";
import { MONGODB_URL, SERVER_ENDPOINT } from "../../environment.js";

const app = express();
const require = createRequire(import.meta.url);
const socket = require("socket.io");
const stripe = require("stripe")(
  "sk_test_51K9298SG0L5n931fO5a1eam6RpshJ6BCyERBpVuen4r1MiOY4TCQbnpij3bm2YInwtWS1T0JfSsQC1hkphTKXS8V000Mmo2Pp4"
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Available routes
app.use(`${SERVER_ENDPOINT}/api/auth`, authentication);
app.use(`${SERVER_ENDPOINT}/timetable`, timeTable);
app.use(`${SERVER_ENDPOINT}/api/req`, requestclose);
app.use(`${SERVER_ENDPOINT}/notices`, notice);
app.use(`${SERVER_ENDPOINT}/AllStud`, AllData);
app.use(`${SERVER_ENDPOINT}/images`, images)
app.use(`${SERVER_ENDPOINT}/close`, close);
app.post(`${SERVER_ENDPOINT}/checkout`, async (req, res) => {
  // console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { price, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const user = await student.findOne({ email: token.email })

    user.Fees.DaysRemain = user.Fees.DaysRemain + 30

    user.Fees.started = Math.ceil(new Date().getTime() / (1000 * 60 * 60 * 24))

    await user.save()

    console.log("Charge:", { price, user });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
});

const CONNECTION_URL = MONGODB_URL;
const PORT = process.env.PORT || 5000;
try {
  mongoose
    .connect(CONNECTION_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoDB Connected"));
  mongoose.set("useFindAndModify", false);
} catch (error) {
  console.log(error.message);
}
const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

export const handler = serverless(app);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let users = [];

const addUser = (userid, socketid) => {
  console.log(users);
  users = users.filter((user) => user.userId !== userid);
  users.push({ userId: userid, socketId: socketid });
  console.log(users);
};

const getUser = (userId) => users.find((user) => user.userId === userId.user);

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.emit("connection", null);
  //console.log('new user connected');
  //console.log(socket.id);

  socket.on("addUser", (user) => {
    console.log("---------------------joined-------------------------");
    addUser(user, socket.id);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("removed", socket.id);
  });
  socket.on("sendMessage", async (data) => {
    console.log(data);
    if (data.sender === "admin1@gmail.com") {
      try {
        if (data.Accepted) {
          const deliever = new Delieveries({
            room_no: data.room_no,
            meal: data.meal,
            date: new Date(),
            email: data.user,
            id: data.id,
          });
          await deliever.save();
        } else if (data.delievered) {
          await Delieveries.findOneAndDelete({ id: data.id });

          //    console.log("deleted",del)
        }
        if (!data.delievered) await reqorder.findByIdAndDelete(data.id);

        const user1 = await Student.findOne({ email: data.user });
        data.user = `${data.user}re`;
        const user = getUser(data);

        // console.log(user1.Notifications)

        if (data.delievered) {
          user1.Notifications.push({
            text: `Your ${data.meal} has been delievered`,
            date: new Date(),
          });
          await user1.save();
        } else {
          user1.Notifications.push({
            text: data.Accepted
              ? `Your ${data.meal} will be served`
              : `Your request for ${data.meal} has been denied`,
            date: new Date(),
          });
          await user1.save();
        }

        console.log(user);
        if (user) {
          if (!data.delievered) {
            io.to(user.socketId).emit("recieve", {
              text: data.Accepted
                ? `Your ${data.meal} will be served`
                : `Your request for ${data.meal} has been denied`,
              date: new Date(),
            });
          } else {
            io.to(user.socketId).emit("recieve", {
              text: `Your ${data.meal} has been delievered`,
              date: new Date(),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (data.sender !== "admin1@gmail.com" && data.info.RoomOrder) {
      const info = data.info;
      const request = new reqorder({
        name: info.name,
        email: data.sender,
        room_no: info.room_no,
        reason: info.reason,
        meal: data.meal,
        date: new Date(),
      });
      console.log(Date(), request);
      await request.save();
      const user = getUser(data);
      console.log(user);
      if (user) {
        io.to(user.socketId).emit("recieve", {
          name: info.name,
          email: data.sender,
          room_no: info.room_no,
          reason: info.reason,
          meal: data.meal,
          date: new Date(),
          _id: request._id,
        });
      }
    }
  });
});

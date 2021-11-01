import express from "express";

import { Edittimetable,Gettimetable } from "../Controllers/timetable.js";

const timeTable = express.Router()

timeTable.post('/edit',Edittimetable)

timeTable.get('/getTime',Gettimetable)

export default timeTable
import express from "express";

import { editNotices, getNotices } from "../Controllers/Notices.js";

const notice  = express.Router()

notice.post("/edit",editNotices)

notice.get("/get",getNotices)

export default notice
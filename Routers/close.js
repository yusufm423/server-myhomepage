import Student from "../Models/Student.js";
import express from "express";
import { Close } from "../Controllers/AllStud.js";
const close =express.Router()

close.post('/acc',Close)
export default close
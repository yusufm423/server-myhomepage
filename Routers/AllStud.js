import express from "express";
import { getAllStud } from "../Controllers/AllStud.js";

const AllData = express.Router();

AllData.get("/get", getAllStud);

export default AllData;

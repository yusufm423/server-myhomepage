import express from "express";

import {getImage,postImage} from '../Controllers/images.js'

const images = express.Router();

images.post("/get", getImage);

images.post("/post",postImage);
export default images;

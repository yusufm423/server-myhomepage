import express from 'express';
import { validationResult} from 'express-validator';
import reqClose from '../Models/RequestClose.js';

const router = express.Router()

//ROUTE1 create student request to close using: POST "/api/req/reqclose"
router.post('/reqclose',async (req, res)=>{
    let success = false
    //for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    try{
    
    let user= await reqClose.create({
        name: req.body.name,
        email: req.body.email,
        room_no: req.body.room_no,
        reason: req.body.reason,
        meal: req.body.meal
      })

      // console.log(jwtData)
      success = true
      res.json({success})
      // res.json(user)
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error occured")
    }
})
export default router
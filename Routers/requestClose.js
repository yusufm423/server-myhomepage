import express from 'express';
import { validationResult} from 'express-validator';
import reqClose from '../Models/RequestClose.js';
import reqOrder from '../Models/ReqRoomOrder.js';
import feedback from '../Models/Feedback.js';
import fetchuser from '../Controllers/fetchuser.js';
import Delieveries from '../Models/Delieveries.js';
import reqclose from '../Models/RequestClose.js';


const router = express.Router()

router.get('/reqorder/get',async (req,res)=>{
  try{

    // console.log("reached")

    const requests = await reqOrder.find()

    const delieveries = await Delieveries.find()

    const reqClose = await reqclose.find()
    
    res.status(200).json({requests,delieveries,reqClose})

  }
  catch(error){
    res.status(404).send('Not available')
  }
})

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
        meal: req.body.meal,
        date:new Date()
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

//ROUTE2 create student request to order using: POST "/api/req/reqorder"
router.post('/reqorder',async (req, res)=>{
  let success = false
  //for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  
  try{
  
  let user= await reqOrder.create({
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

//ROUTE3 feedback: POST "/api/req/feedback"
router.post('/feedback',fetchuser,async (req, res)=>{
  let success = false
  //for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  
  try{
  
  let user= await feedback.create({
      name: req.body.name,
      email: req.body.email,
      room_no: req.body.room_no,
      message: req.body.message
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
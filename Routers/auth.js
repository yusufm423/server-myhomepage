import express from 'express';
import Student from '../Models/Student.js'
import {body, validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchuser from '../Controllers/fetchuser.js'
import Admin from '../Models/Admin.js';

const router = express.Router()

const JWT_SECRET = 'eren_JAEGER@423'

//ROUTE1 create a user using: POST "/api/auth/signupstudent". doesnt require auth
router.post('/signupstudent',[
    body('name','enter valid name').isLength({ min: 3 }),
    body('email','enter valid email').isEmail(),
    body('password','enter valid password').isLength({ min: 5 })
  ],async (req, res)=>{
    let success = false
    //for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with this email exists already?
    
    try{
    let user = await Student.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({success, error:"Sorry a user exists already"})
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    
    user= await Student.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        enrollment_no: req.body.enrollment_no,
        faculty_no: req.body.faculty_no 
      })
     
      const data = {
          user:{
            id: user.id
          }

      }

      const authToken = jwt.sign(data, JWT_SECRET)
      // console.log(jwtData)
      success = true
      res.json({success, authToken})
      // res.json(user)
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error occured")
    }
})

//ROUTE2 login user using: POST "/api/auth/loginstudent". doesnt require auth
router.post('/loginstudent',[
  body('email','enter valid email').isEmail(),
  body('password','Password cannot be blank').exists()
],async (req, res)=>{
  let success = false
  //for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try{
    let user = await Student.findOne({email})
    if(!user){
      return res.status(400).json({error:"Please enter correct credentials"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success, error:"Please enter correct credentials"})

    }
    
    const data = {
      user:{
        id: user.id
      }
  }

  const authToken = jwt.sign(data, JWT_SECRET)
  // console.log(jwtData)
  success = true
  res.json({success, authToken})


  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured")
  }
})

//ROUTE3 get details of user using: post "/api/auth/getstudent". require auth
router.post('/getstudent',fetchuser,async (req, res)=>{

  try{
  const userId = req.user.id;
  const user = await Student.findById(userId).select("-password")
  res.send(user)
  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error occured")
    }
  })

  //ROUTE4 create a user using: POST "/api/auth/signupadmin". doesnt require auth
router.post('/signupadmin',[
  body('name','enter valid name').isLength({ min: 3 }),
  body('email','enter valid email').isEmail(),
  body('password','enter valid password').isLength({ min: 5 })
],async (req, res)=>{
  let success = false
  //for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  //check whether the user with this email exists already?
  
  try{
  let user = await Admin.findOne({email: req.body.email})
  if(user){
    return res.status(400).json({success, error:"Sorry a user exists already"})
  }

  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password, salt)
  
  user= await Admin.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    })
   
    const data = {
        user:{
          id: user.id
        }

    }

    const authToken = jwt.sign(data, JWT_SECRET)
    // console.log(jwtData)
    success = true
    res.json({success, authToken})
    // res.json(user)
  } catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured")
  }
})

//ROUTE5 login user using: POST "/api/auth/loginadmin". doesnt require auth
router.post('/loginadmin',[
body('email','enter valid email').isEmail(),
body('password','Password cannot be blank').exists()
],async (req, res)=>{
let success = false
//for errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;
try{
  let user = await Admin.findOne({email})
  if(!user){
    return res.status(400).json({error:"Please enter correct credentials"})
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    return res.status(400).json({success, error:"Please enter correct credentials"})

  }
  
  const data = {
    user:{
      id: user.id
    }
}

const authToken = jwt.sign(data, JWT_SECRET)
// console.log(jwtData)
success = true
res.json({success, authToken})


}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server error occured")
}
})

//ROUTE6 get details of user using: post "/api/auth/getadmin". require auth
router.post('/getadmin',fetchuser,async (req, res)=>{

try{
const userId = req.user.id;
const user = await Admin.findById(userId).select("-password")
res.send(user)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured")
  }
})
export default router
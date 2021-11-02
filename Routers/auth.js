import express from 'express';
import Student from '../Models/Student.js'
import {body, validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router()

let JWT_SECRET = 'eren_JAEGER@423'

//ROUTE1 create a user using: POST "/api/auth/signup". doesnt require auth
router.post('/signup',[
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
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'Please eter a unique email'})}
      // );
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

export default router
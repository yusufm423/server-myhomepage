import express from 'express';
const router = express.Router()

router.get('/',(req, res)=>{
    let obj = {
        a: 'yusuf',
        number: 34
    }
    res.json(obj)
})

export default router
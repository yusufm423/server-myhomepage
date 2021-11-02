import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eren_JAEGER@423';


export const fetchuser = (req, res, next) =>{
    //get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please Login first 11"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    }catch(error){
        res.status(401).send({error: "Please Login first 22"})
    }

}

export default fetchuser
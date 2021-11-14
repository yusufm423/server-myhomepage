
import Notices from "../Models/Notices.js";

export const editNotices = async (req, res) => {
    
    try{const {heading,file} = req.body

    
    
    const notice = new Notices({heading , file,Date: new Date()})

    await notice.save()

    console.log("sending",notice.heading,new Date())

    res.status(200).json(notice)
}
catch(error)
{
    console.log(error)
    res.status(404)
}
    
}

export const getNotices = async (req, res) => {
    
    try{
    
    const notices = await Notices.find()


    console.log("sending",new Date().getTime())

    res.status(200).json(notices)
}
catch(error)
{
    console.log(error)
    res.status(404)
}
    
}


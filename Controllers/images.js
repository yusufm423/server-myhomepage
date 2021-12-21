import images from '../Models/profileImage.js'
import Student from '../Models/Student.js'
export const postImage = async(req,res)=>{

    try{const {image,email} = req.body

    const profile = await images.findOne({email:email})

    if(profile)
    {
        profile.image = image

        await profile.save()
    }
    else
    {
        const newProf = new images({image,email})
        newProf.save()
    }
    res.status(200)

}
catch(error)
{console.log(error.message)}
}

export const getImage = async(req,res)=>{

    try{
        const {email} = req.body
        const image = await images.findOne({email:email})
        if(image)
        res.status(200).json(image.image)

        // console.log(email,"naved")
    }
    catch(error)
    {
        console.log(error.message)
    }
}
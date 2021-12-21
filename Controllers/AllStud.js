import Student from "../Models/Student.js";

export const getAllStud = async (req, res) => {
  try {
    let AllData = await Student.find();
    const days = Math.ceil(
      new Date(2021, 11, 24).getTime() / (1000 * 60 * 60 * 24)
    );
    AllData =  AllData.map((data) => {
      if(data.dining_status){
      data.Fees.DaysRemain -= days - data.Fees.started;
      data.Fees.started = days
      }
      return data;
    });
    res.status(200).json(AllData);
    
    for(let i=0;i<AllData.length;i++)
    {
      await AllData[i].save()
    }
    // console.log(AllData);
  } catch (error) {
    console.log(error);
  }
};

export const Close = async(req,res)=>{
  try{
      const {email} = req.body
      
      const student = await Student.findOne({email})
      
      student.dining_status = close

      await student.save()

      res.status(200)

  }
  catch(error)
  {
    console.log(error.message)
  }
}

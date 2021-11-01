import timeTable from "../Models/timeTable.js"
export const Edittimetable = async (req, res) => {

    try {

        console.log(req.body)
        let data = await timeTable.find()

        data[0].Days = req.body

        await data[0].save()

        // console.log(data[0].Days)
        res.status(200).json(data)
    }
    catch (error) {

        console.log(error)
    }
}
export const Gettimetable = async (req, res) => {

    try {
        // const newtime = new timeTable

        // newtime.save()

        const data = await timeTable.find()

        // console.log(data,"send")

        res.status(200).json(data)
    }
    catch (error) {

        console.log(error)
    }
}
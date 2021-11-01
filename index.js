const connectToMongo = require('./db')
var cors = require('cors')
import timeTable from './Routers/TimeTable.js';

const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//Available routes
app.use("/timetable",timeTable);
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`server-myhomepage listening at http://localhost:${port}`)
})

connectToMongo()
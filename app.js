const express = require('express')
const route = require('./router')
const cors=require("cors")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const morgan = require('morgan')
const app = express()
const db=require("./config/database")

//connect db
db.connect()

const port = 3000 || process.env.PORT

app.use(bodyParser.json({limit:"50mb"}))

app.use(cookieParser())


//http logger
app.use(morgan('combined'))



//chặn
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

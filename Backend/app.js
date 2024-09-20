const express=require('express')
const app=express()
const connectDB=require('./config/database')
const authRouter=require('./Routes/auth')
const cookieParser = require('cookie-parser')



require('dotenv').config();

app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)

const PORT=process.env.PORT || 4000

connectDB().then(() => {
    console.log("connection successful to database")
    app.listen(PORT, () => {
        console.log("up and running at " +PORT)
    })
}).catch(err => {
    console.log("err logging in db" +err)
})

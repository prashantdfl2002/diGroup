require('dotenv').config();

const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const {submitContactform} = require('./controller/contactController')
const PORT = process.env.PORT || 4000;

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/contact",submitContactform)

app.listen(PORT,()=>{
    console.log('server is started');    
})
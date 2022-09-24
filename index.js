const express = require("express")
const app = express()
const db = require("./library/storage")
const port = 5000
const bodyParser = require("body-parser")
require('dotenv').config()

const twilio = require('twilio')

var accountSid = process.env.TWILIOID
var authToken = process.env.TWILIOTOKEN
var client = new twilio(accountSid, authToken)

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.get("/", function (req, res){
    res.send("Hello world!")
})

app.get("/list", function (req, res){
  db.getNotes()
    .then((list) => {
      console.log(list.rows)
      res.send(list.rows)
    })
    .catch((err) => {
      res.status(404).send('Iono fam')
    })
})

app.post("/addEntry", function (req, res){
    const message = req.body.message
    const date = req.body.date
    const time = req.body.time
    const where = req.body.where
    const toPerson = '+1'+req.body.number
    const text = "Message: " + message + " / Date: " + date + " / Time: " + time + " / Place: " +  where

  
  db.addEntry(message, date, time, where, toPerson)
    .then(() => {
      console.log("Worked?")
    }).catch((err) => {
      console.log(err)
    })

  client.messages
  .create({
     body: text,
     from: process.env.TWILIONUMBER,
     to: toPerson
   })
  .then((message) => {
    console.log(message.sid)
  }).catch((err) => {
    console.log(err)
  })

  res.status(200).json({
    all: "good"
    })
  
})

//#region Kick Off Functions
const startExpressApp = () => {
    app.listen(port, () => {
      console.log('express is listening on port ' + port)
      })      
  }
  
  const bootupSequenceFailed = (err) => {
    console.error('You are unable to connect to the database:', err)
    console.error('Goodbye!')
    process.exit(1)
  }
  
  //global kickoff point
  db.connect()
    .then(startExpressApp)
    .catch(bootupSequenceFailed)
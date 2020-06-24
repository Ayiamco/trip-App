var path = require('path')
const fileHandler= require('./filehandler.js')

const express = require('express')
const dotenv = require('dotenv');
dotenv.config();


const app = express()
const cors=require('cors')

app.use(express.static('dist'))
app.use(cors())


app.get('/', function (req, res) {
    
    res.sendFile('/dist/index.html')
})

// set port 
let port=8080
app.listen(port, function () {
    console.log(`Example app listening on port ${port} !`)
})

app.get('/getWeather', serveWeather)
app.get('/getCoordinate', serveCoordinate)
app.get('/getPicture',servePicture)

async function serveCoordinate(req,res){
  console.log("get serveCoordinate input query parameter: ",req.query['location'])
  let travelLocation=req.query['location']
  const username = process.env.geoname_username
  let geoloc=await fileHandler.getCoordinate(travelLocation,username)
  
  if (!geoloc.length==1){
    res.send({'lat':geoloc[0],'long':geoloc[1]})
  }
  else{
    res.send({'lat':geoloc[0],'long':geoloc[0]})
  }
  
}


//function to do shit
async function serveWeather(req,res){
  const key=process.env.weatherKey;
  
  let weatherCondition=await fileHandler.getWeather(req.query['lat'],req.query['long'],req.query['Diff'],key)
  if(weatherCondition.length==2){
    console.log({'description':weatherCondition[0],'temp':weatherCondition[1]})
    res.send({'description':weatherCondition[0],'temp':weatherCondition[1]})
  }
  else{
    console.log({'description':weatherCondition[0],'temp':weatherCondition[0]})
    res.send({'description':weatherCondition[0],'temp':weatherCondition[0]})
  }
  }


async function servePicture(req,res){
  console.log("get servePicture input query parameter: ",req.query['location'])
  const pixaBayKey=process.env.pixaBayKey
  let picRes=await fileHandler.getPicture(req.query['location'],pixaBayKey)
  res.send(picRes)
}
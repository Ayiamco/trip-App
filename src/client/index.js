import { addTrip } from './js/clientHandler'
import { removeTrip } from './js/clientHandler'
import { addList } from './js/clientHandler'

import  './styles/footer.scss'
import  './styles/base.scss'
import  './styles/headers.scss'


export{
    addList,
    removeTrip,
    addTrip
}


//add country options
addList()

//event listener to add trip
document.getElementById('addTrip').addEventListener('click',addTrip)


//set default date to today
let travelDate=document.getElementById("travelDate").value //
var today = new Date();
if (Number(today.getMonth()+1)<10){
    var month ="0"+String(Number(today.getMonth()+1))
}
else{var month=today.getMonth()+1}
document.getElementById("travelDate").value =today.getFullYear()+'-'+month+'-'+today.getDate() 

//render previously added trips
try{
    localStorage["trips"].split(' ')
    let renderHtml=document.querySelector(".trip")
    renderHtml.innerHTML=localStorage["trips"]
}
catch (err){
    console.log('No trip Added yet')
}

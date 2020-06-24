const countries=["Select Country","Afghanistan","Albania","Algeria", "Armenia",  "Angola", "Argentina", "Australia", "Azerbaijan","Britian", "Bosnia-Herzegovina",  "Bangladeshi", "Bulgaria", "Bahrain", "Burundi", "Bolivia", "Brazil",  "Botswana",  "Canada","Cambodia", "Cayman Islands","Cape Verde", "Congo",  "Chile",  "China",  "Colombia","Croatia", "Cuba",  "Czech Republic", "Denmark", "Dominica",  "Egypt", "Eritrea", "Ethiopia",  "Georgia", "Ghana", "Gibraltar", "Gambia", "Guinea", "Guatemala",  "Honduras",  "Haiti", "Hungaria", "Indonesia", "Isreal", "India", "Iraq", "Iranian", "Iceland",  "Jamaica", "Japan", "Kenya", "Kyrgystan", "North Korean",  "Kuwait",  "Kazakhstan",  "Lebanon", "Sri Lankan", "Liberia", "Lesotho", "Libya", "Morocco",  "Macedonia", "Mongolia", "Mauritania",  "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia","Netherlands", "Nigeria", "Norwegia", "Nepal", "New Zealand", "Omani Rial", "Panama", "Peruvia", "Papua New Guinea", "Philippines", "Pakistani", "Poland", "Paragua", "Qatar", "Romania", "Serbia", "Russia", "Rwanda", "Saudi Arabia", "Seychellis", "Sudan",  "Sweden", "Singapore", "Sierra Leone", "Somalia", "South African","South Korean","Switzerland",  "Syria",  "Thailand",  "Tunisia", "Turkey", "Trinidad and Tobago", "Taiwan", "Tanzania", "Ukraine", "Uganda", "United Arab Emirate","United States", "Uruguaya", "Uzbekistan", "Vietnam" , "Yemeni", "Zambia", "Zimbabwe"]

export function addList(){
    /*function to add list of conutres drop down */
    
    for(let index=0;index<countries.length;index++){
        let option=document.createElement('option')
        
        option.text = countries[index];
        option.value=countries[index];
        let select=document.getElementById('countries')
        select.appendChild(option)
    }        
}

export async function addTrip(){
    /*get difference between todays date and travelDate*/
    let travelDate=document.getElementById("travelDate").value //
    var today = new Date();
    if (Number(today.getMonth()+1)<10){
        var month ="0"+String(Number(today.getMonth()+1))
    }
    else{var month=today.getMonth()+1}
    var dateToday = today.getFullYear()+'-'+month+'-'+today.getDate();
    let date1=new Date(dateToday)
    var date2 = new Date(travelDate);     
    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if(Difference_In_Days<0 || countries[document.getElementById("countries").selectedIndex]=="Select Country"){
        /* if block to change error message display content*/
        if(Difference_In_Days<0){
            document.getElementById('errorMessage').textContent="Error: Travel Date has passed."
            document.getElementById('errorMessage').style.display="block"
        }
        
        else{
            document.getElementById('errorMessage').textContent="Please Select a Country."
            document.getElementById('errorMessage').style.display="block"
        }
    }

    else{
        //get travel location coordinates
        let coord= await fetch(`http://localhost:8080/getCoordinate?location=${document.getElementById("travelCity").value}`)
        let coordJson= await coord.json()
        console.log("coordJson: ",coordJson)
    
        if (coordJson.lat=='Error occured'){
            document.getElementById('errorMessage').textContent="Please Check internet Connection and City spelling."
            document.getElementById('errorMessage').style.display="block"
            
        }
        else{
            document.getElementById('errorMessage').style.display="none"

            //get weather condition
            let weatherCondition= await fetch(`http://localhost:8080/getWeather?long=${coordJson.long}&lat=${coordJson.lat}&Diff=${Difference_In_Days}`)
            
            weatherCondition= await weatherCondition.json()
            let weatherDesc=weatherCondition.description
            let temp=weatherCondition.temp
            console.log("weatherDesc: ",weatherDesc," temp: " ,temp)
            if(temp=='bad Network'){
                document.getElementById('errorMessage').textContent="Please Check internet Connection and City spelling."
                document.getElementById('errorMessage').style.display="block"
            }
            else{
                let city=document.getElementById("travelCity").value[0].toUpperCase() + document.getElementById("travelCity").value.slice(1).toLowerCase()
            
                //get location image
                let imgUrlJson=await fetch(`http://localhost:8080/getPicture?location=${document.getElementById("travelCity").value}`)
                console.log(imgUrlJson)
                let imgUrl= await imgUrlJson.json()
                imgUrl=imgUrl.imgUrl
                console.log('ImgUrl: ',imgUrl)
                //create html element to be added to DOM
                let html=`
                <div class="trip-sidebar  my-row">
                    <figure>
                        <img src="${imgUrl}" alt="Image of ${city}">
                        <figcaption>SomeWhere in ${city}.</figcaption>
                    </figure>
                </div> 
                <div class="tripDescription my-row">
                    <h2>My Trip To: ${city}, ${countries[document.getElementById("countries").selectedIndex]}
                        <br>Departing: ${document.getElementById("travelDate").value}
                        <hr> 
                    </h2> 
                    <p>Your trip to ${city} is   ${Difference_In_Days >0? "in "+Difference_In_Days +" days":"Today"}</p> 
                    <p>Projected weather condition: ${weatherDesc} at ${temp}&degC </p>
                    <button class="removeTrip" onclick='Client.removeTrip(this)'>Remove Trip</button>
                </div>`
                
                let trips=document.querySelector('.trip')
                trips.innerHTML=html + trips.innerHTML
                document.getElementById("countries").value=countries[0]
                document.getElementById("travelCity").value=''
                console.log('got here..................')
                //update local storage
                if(String(localStorage["trips"])=="undefined"){
                    localStorage['trips']=`${html}`
                }
                else{
                    localStorage['trips']=`${html}${localStorage['trips']}`
                }
                console.log(localStorage['trips'])
            }
        }         
    }      
}


export function removeTrip (element){
    console.log("started................" )
    let tripList= document.querySelector('.trip')
    let childs = tripList.childNodes
    console.log(childs)
    let currentTask=(element.parentElement)
    let currentTaskIndex=0
    let remainingTrips=''
    for (let child of childs){
        if(child.nodeName=="#text"){
            child.parentElement.removeChild(child)
        }
    }
    console.log("child lenght: ",childs)
    for(let index=1;index<childs.length;index +=2){
        console.log(index + ": ", childs[index])
        if (currentTask.textContent==childs[index].textContent){
            currentTaskIndex=index
            childs[index].setAttribute('class','deletedElement1')
            childs[index-1].setAttribute('class','deletedElement2')

        }
        else{
            remainingTrips+=`<div class="trip-sidebar  my-row>${String(childs[index-1].innerHTML)}</div>`
            remainingTrips+=`<div class="tripDescription my-row">${String(childs[index].innerHTML)}</div>`
            
        }
        
    }
    
    //remove deleted element 
    let currentElement=document.querySelector(`.deletedElement1`)
    currentElement.style.display="none"
    currentElement.parentElement.removeChild(currentElement)
    currentElement=document.querySelector(`.deletedElement2`)
    currentElement.style.display="none"
    currentElement.parentElement.removeChild(currentElement)

    //update the local storage
    localStorage['trips']=remainingTrips
    

}


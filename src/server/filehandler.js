
const fetch = require("node-fetch");
async function getWeather(lat,long,Difference_In_Days,key){
    
    let baseUrl='https://api.weatherbit.io/v2.0/'
    try{
        if (Difference_In_Days<7){
            let resWeather= await fetch(`${baseUrl}current?key=${key}&lon=${long}&lat=${lat}`)
            let respWeather= await resWeather.json()
            let description=respWeather["data"][0]["weather"]["description"]
            let temp=respWeather["data"][0]["temp"]
            return [description,temp]
        }
        else{
            let resWeather= await fetch(`${baseUrl}forecast/daily?key=${key}&lon=${long}&lat=${lat}`)
            let respWeather= await resWeather.json()
            let description=respWeather["data"][0]["description"]
            let temp=respWeather["data"][0]["temp"]
            return [description,temp]
        }      
    }
    catch(error){
        console.log('weather error: ',error)
        return ["bad Network"]
    } 
}

async function getCoordinate(travelLocation,username){
    let resp = await fetch(`http://api.geonames.org/wikipediaSearchJSON?q=${travelLocation}&maxRows=1&username=${username}`)

    try{
        let respJson= await resp.json()
        let lat = respJson.geonames['0']['lat']
        let long =respJson.geonames['0']['lng']
        return [lat,long]   
    }
    catch(error){
        console.log('An Error occured: ',error)
        return["Error occured"]
    }
} 

async function getPicture(location,pixaBayKey){
    
    let res=await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&q=${location}&image_type=photo`) 
    let respJson= await res.json()

    try{
        respJson['hits'][0]['largeImageURL']
        return { "imgUrl":respJson['hits'][1]['largeImageURL']}
    }
    catch (error){
        return {"imgUrl":''}
    }
}

module.exports= {
    'getWeather':getWeather,
    'getCoordinate':getCoordinate,
    'getPicture': getPicture,

}

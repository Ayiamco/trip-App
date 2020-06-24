const dotenv = require('dotenv');
let filehandler=require('../src/server/filehandler')
dotenv.config();

test("properly test gets the latitude and longitude", async () =>{
    const username=process.env.geoname_username
    const location="East London"
    
    return filehandler.getCoordinate(location,username).then(data => {
          expect(data).toEqual([-33.01456683333333, 27.903607833333332]);
       
})})
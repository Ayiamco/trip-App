# Final project for the udacity frontend nano degree program.

The goal was to build an app to show case our ability to ;
- Use webpack as a build tool
- Setup service workers to meet one of progressive web app requirement
- Work with API'S
- Work with node and express
- Create responsive and interactive  web apps.
- Unit tesing with Jest

 The web app built takes the users travel location and travel date as input. If the the travel date is less tha 7days away ,the UI is dynamically updated with the weather condition for today else it is updated with the projected weather condition for the travel date. The following API's were used; 
> To get the latitude and longitude of the travel location
>>[Geoname API](http://api.geonames.org/wikipediaSearchJSON)

>To get the weather condition of a certain geolocation sending its latitude and longitude as parameters.
>>[Open weather API](https://api.weatherbit.io)

>To get a picture of a monument in the travel location.
>>[Pixabay API](https://pixabay.com)

### Enviromental variables
1. weatherKey= api key from the [Open weather API](https://api.weatherbit.io)
2. geoname_username= Username from [Geoname API](http://api.geonames.org) 
3. pixaBayKey= apikey for [Pixabay API](https://pixabay.com)

#### command to run app
. *npm run start*

#### some extended features implemented
- Allow the user to remove the trip.
- Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
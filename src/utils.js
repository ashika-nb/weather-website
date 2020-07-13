var request = require('request')

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNoaWthbWFwcGVyIiwiYSI6ImNrYzJ5ZWh1bTA3NmIycW10YjBzYXplcWEifQ.VhU0UjMketbvKhDh5cQ1Sg'

    request({ url, json: true }, (error, { body }) => {
        // console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



const forecast = (lang, lat, callback)=>{
    var longitute = lang
    var latitude = lat 
   // console.log(lat + lang)
    const forUrl = 'http://api.weatherstack.com/current?access_key=27b9d4f7957753f05864b05793bf7487&query='   + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitute) 
    
    request({url: forUrl, json: true}, (error,{ body }) => {
        if(error)
            callback('No internet!',undefined)
        else if(body.error)
            callback(body.error.code, undefined)
        else{
            var str = "The current temp is: " + body.current.temperature + " and the code: "+ body.current.weather_code
            callback(undefined, str)
        }
})
}

module.exports = {
    forecast: forecast,
    geocode: geocode
}
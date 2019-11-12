const request = require('request');

const forecast = (latitude, longitude, callback) => {
const url = 'https://api.darksky.net/forecast/98b9832fe3fbba25c7ecc3e18fc36a0a/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'

request({url, json:true}, (error, {body}) => {
    if(error){
        callback('Unable to connect to the weather service', undefined);
    }else if(body.error){
        callback('Unable to find location, '+body.error, undefined);
    }else{
        callback(undefined, (body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degree celsius out.There is a "+body.currently.precipProbability+"% chance of rain."));
    }
})

}

module.exports = forecast;
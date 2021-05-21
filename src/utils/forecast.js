const request = require('request')

const forecast = (latitude,longitude,callback) => 
{
    const key_weather = '534b833ac218b3800bef540d42fcede7'
    const url = `http://api.weatherstack.com/current?access_key=${key_weather}&query=${latitude},${longitude}`



    request({url,json:true, rejectUnauthorized: false,requestCert: false,agent: false}, (error,{body}={}) => 
    {
        if(error)
            callback({error : 'unable to connect to weather services!'},undefined)
        else if(body.error)
            callback({error : 'Unable to find location! Please enter valid location'},undefined)
        else
        {
            const weather = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const city = body.location.name
            const feelslike = body.current.feelslike
            callback(undefined,{message : `${weather}. the temperature is ${temp} c in ${city}. it feels like ${feelslike} c`})
        }
            
    
    })
}

module.exports= forecast
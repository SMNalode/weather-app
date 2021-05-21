const request = require('request')

const geocode = (address,callback) => {
    const key_geo = 'pk.eyJ1Ijoic2hyaTE5MDgiLCJhIjoiY2tvbnZjNTUzMDU5ZTJvdHRlZzR5N2ZoYSJ9.9PZfdEWRKHk9anz7CoR8mQ'
    const address_URI = encodeURI(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address_URI}.json?access_token=${key_geo}&limit=1`

    request({url , json : true, rejectUnauthorized: false,requestCert: false,agent: false},(error,{body}) => {

        if(error)
        {
            callback({error : 'unable to connect to location services!'},undefined)
        }
        else if(Object.keys(body.features).length===0)
        {
            callback({error : 'No search result found! Try again'},undefined)
        }
        else
        {            
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].context[0].text
            })
        }

    })

}

module.exports = geocode
const request = require('request')

const forecast =(latitude , longitude , callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=de712012e8ab468de345ef965e6a0cdf&query=' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) =>{
        if(error)
        {
            callback('unable to connect to location', undefined)

        }
        else if(body.error){
            callback('unable to find location', undefined)
        }
        else 
        {
            callback(undefined, body.current.weather_descriptions[0] + ". it is currently " + body.current.temperature + " degree temperature " + body.current.humidity + ". humadity")
        }
    })
}

module.exports = forecast
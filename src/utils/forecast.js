const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=63e3cede4bab3251466e39297db11c94&query=${latitude},${longitude}`
    
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees out. Feels like ${body.current.feelslike} degrees.`)
        }
    })
}

module.exports = forecast
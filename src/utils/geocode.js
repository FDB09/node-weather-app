const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=650b04c4001ff3c4ab686742499fedcd&limit=1&query=${address}`

    debugger

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.data.length === 0) {
            callback('Location does not exist.', undefined)
        } else {
            callback(undefined, {
                name: body.data[0].name,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            })
        }
    })
}

module.exports = geocode
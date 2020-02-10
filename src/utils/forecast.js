const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5cc233f6a311119733794f821cd33604/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if (body.error){
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary)
        }
    })
}

module.exports = forecast
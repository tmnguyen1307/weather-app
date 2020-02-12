const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

//Customize views directory
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)

app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Tam Nguyen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Tam Nguyen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tam Nguyen',
        message: 'Feel free to ask for help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location, 
                address
            })
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})
//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tam Nguyen',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tam Nguyen',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port + '.')
})
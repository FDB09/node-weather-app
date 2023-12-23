const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join( __dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup views location and handlebars engine
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Set default static directory to serve (root)
app.use(express.static(publicDirectoryPath))

// Root route
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fernando Daniel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Fernando Burgos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Daniel Burgos',
        helpText: 'This is a help message'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(address, (error, { latitude, longitude, name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location: name,
                address
            })
        })
    })
})

// Query String example
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fernando Daniel',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fernando Daniel',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}...`)
})
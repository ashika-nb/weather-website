const path = require('path')
const express = require('express')
const hbs = require('hbs')

const utils = require('./utils')
const { forecast } = require('./utils')

const app = express()

//Defined paths
const pubDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up static diectory to serve
app.use(express.static(pubDir))

//handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashika'
    })
})

// app.get('/weather', (req, res) => {
//     if(!req.query.address){
//         return res.send({
//             error: 'No address!'
//         })
//     }
//     res.send({
//         forecast: 'it is snowing',
//         location: 'Philly',
//         address: req.query.address
//     })
// })

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Ashika',
        title: 'Let me help!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ashika'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address!'
        })
    }
    utils.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        utils.forecast(latitude,longitude, (error, forecastData) =>{
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData ,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) =>{
    res.render('error',{
        name: 'Ashika',
        title: '404',
        message: 'Help article not found!'
    })
})

app.get('*', (req,res) =>{
    res.render('error',{
        name: 'Ashika',
        title: '404',
        message: 'Page not found!'
    })
})
app.listen(3000, () => {
    console.log('Server is up')
})


const express = require('express')
const hbs = require('hbs')
const path = require('path')

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../template/view')
const partialsPath  = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res) =>{
      res.render('index',{
          title :'Check Weather Here',
          name  : 'partha'
      })
})

app.get('/contactUs', (req,res) =>{
    res.render('contactUs',{
        title:'want to connect with us!',
        name :'partha'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title :'know more about this app',
        name : 'partha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('*', (req,res) =>{
    res.render('404',{
        title : '404 error page',
        errorMessage : 'page you are looking for is missing',
        name: 'partha'
    })
})
app.listen(5000,()=>{
    console.log('server is busy on port 5000.')
})




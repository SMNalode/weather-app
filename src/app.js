const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const foorecast = require('./utils/forecast')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views',viewsPath)
app.set('view engine','hbs')
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)


app.get('', (req,res) => {
    res.render('index',{
        title : 'weather',
        name : 'Shri'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'about',
        name : 'Shri'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title : 'help',
        name : 'Shri',
        message : 'Help Page under construction !'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send('Error: provide an address ')
    }
    //console.log(req.query.address)
    geocode(req.query.address,({error}={},{latitude,longitude,location} = {}) => {
        if(error)
        {
           return res.send({error})
        }

        forecast(latitude,longitude,({error} = {},{message} = {})=> {
            if(error)
            {
               return res.send({error})
            }

            res.send(
                {
                    Forecast : message,
                    location : location,
                    address : req.query.address
                }
            )
        })

        

    })
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        message : 'Help page not found',
        name : 'Shri'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        message : 'page not found',
        name : 'Shri'
    })
})

app.listen(port,() => {
    console.log(`server is up at port ${port}`)
})
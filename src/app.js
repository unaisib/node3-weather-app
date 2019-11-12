const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {title: 'Weather', name:'Unais'}) 
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help', name: 'Unais'}) 
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', name:'Unais'}) 
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "oops!, I can't do anything without data." 
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
        return res.send({ error });
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
            return res.send({ error });
            }
    
            res.send({forecast:forecastData,
                location: location, 
                address: req.query.address});           
            
        })
    });
    //
});



app.get('/help/*', (req,res) => {
    res.render('404', {title:'404',name:'Unais',errormessage:'Help article not found'})
})

app.get('*', (req, res) =>{
    res.render('404',{title:'404', name:'Unais', errormessage:'Not Found'})
})

app.listen(port, () => {
    console.log('server is up and running on port '+port);
});
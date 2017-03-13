const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

    var now = new Date().toString();

    var log = `${now} : ${req.method} : ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) => {

        if(err){

            console.log('unable to append .log file');

        }

    });

    next();



});

hbs.registerPartials(__dirname + '/Views/partials');

hbs.registerHelper('getCurrentYear', () => {

    return new Date().getFullYear();

});

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('Home.hbs', {

        HomeTitle : 'Homepage',
        HomeHead : 'Anilgulgor node web server home page',
        HomeParagraph : 'Welcome to my homepage'

    })

});

app.get('/About', (req, res) => {

    res.render('About.hbs', {

        HomeTitle : 'AboutPage',
        HomeHead : 'Anilgulgor node web server about page',
        HomeParagraph : 'This page is all about creation of about page :)'
        

    });

});


app.listen(3000);
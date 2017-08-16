let express = require('express');
let router = express.Router();
let User = require('../models/user');
let mid = require('../middleware');
let request = require('request');

// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
    if (! req.session.userId ) {
        var err = new Error("You are not authorized to view this page.");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {

                function getWeather() {

                    let url = `http://api.openweathermap.org/data/2.5/weather?q=Adelaide,AU&APPID=807e8e44e022aacc43a5211f2c523477&units=metric`;
                    request({url: url, json: true}, function (err, res, json) {
                        if (err) {
                            throw err;
                        }
                        else {
                            let weatherObj = {
                                "temp": json.main.temp,
                                "outlook": json.weather["0"].description,
                                "humidity": json.main.humidity,
                                "sunrise": (new Date(json.sys.sunrise*1000)).toLocaleTimeString(),
                                "sunset": (new Date(json.sys.sunset*1000)).toLocaleTimeString()
                            };
                            renderResult(weatherObj);
                        }
                    });
                }

                function renderResult(weatherObj) {
                    return res.render('profile',
                        { title: 'Profile', name: user.name, favorite: user.favoriteWalk,
                            temp: weatherObj.temp, outlook: weatherObj.outlook, humidity: weatherObj.humidity,
                            sunrise: weatherObj.sunrise, sunset: weatherObj.sunset
                        })
                }

                getWeather();
            }
        });
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
    return res.render('login', { title: 'Log In'});
});

// Get /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err){
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        })
    }
});

// POST /login
router.post('/login', function(req, res, next) {
    if(req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
    return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
    if (req.body.email &&
        req.body.name &&
        req.body.favoriteWalk &&
        req.body.password &&
        req.body.confirmPassword) {

        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // create object with form input
        var userData = {
            email: req.body.email,
            name: req.body.name,
            favoriteWalk: req.body.favoriteWalk,
            password: req.body.password
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});

module.exports = router;

// import all the modules you need
const express = require('express');
const path = require('path');

// set up express-validator
const {check, validationResult} = require('express-validator');


// set up the app
var myApp = express();

// set up the body-parser middleware
myApp.use(express.urlencoded({extended:false}));

// define/set the paths to public folder and views folder
myApp.set('view engine', 'ejs');
myApp.set('views', path.join(__dirname, 'views')); // set a value for express
myApp.use(express.static(__dirname + '/public')); // set up a middleware to server static files

// define the routes

// define the route for index page "/"
myApp.get('/',function(req, res){
    res.render('form')
})

// handle post
// we can fetch data from the request (req) using body parser
// body-parser is included with express now
myApp.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email not in correct format').isEmail()
], function(req, res){

    const errors = validationResult(req);
    if(errors.isEmpty()){ // if no errors are there

        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var postcode = req.body.postcode;
        var lunch = req.body.lunch;
        var tickets = req.body.tickets;
        var campus = req.body.campus;

        const ticketCost = 20;
        const lunchCost = 10;

        var subTotal = parseInt(tickets) * ticketCost;
        if(lunch == 'yes'){
            subTotal += lunchCost;
        }
        // do tax calculations and create a tax variable

        // prepare data to send to the view
        var pageData = {
            name : name,
            email : email,
            phone : phone,
            postcode : postcode, 
            lunch : lunch,
            tickets : tickets,
            campus : campus,
            subTotal : subTotal,
        }
        res.render('form', pageData);
    }
    else{ // When there are errors
        console.log(errors.array());
        res.render('form', {errors: errors.array()})
    }

    // res.send(
    //     `
    //     Name: ${name} <br/>
    //     Email: ${email} <br/>
    //     Phone: ${phone} <br/>
    //     `
    // );
})

// start the server (listen at a port)
myApp.listen(8080);
console.log('Everything executed, open http://localhost:8080/ in the browser.')
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var config = {
    database: 'shoe_store', //name of database
    host: 'localhost', //where is your database (which computer)
    port: 5432, //port # for database, 5432 is default
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000 //30 seconds to try to connect to our database
};

var pool = new pg.Pool(config);

// for local host 5000/shoes should return array of shoe objects
app.get('/shoes', function(req, res){
    //attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            //there was an error connecting to database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }   else {
            //we connected to the database!!!
            //now we are going to GET things from the DB
            client.query('SELECT * FROM shoes;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    //query failed. did you test in postico?
                    //log the error
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                }  else {
                    res.send(result.rows);
                }
            });
        }
    });
});

app.listen(port, function(){
    console.log('server is listening on port', port);
});
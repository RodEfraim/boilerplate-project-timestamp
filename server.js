// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * Testing API endpoint.
 */
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello World'});
});

// Helper function to validate date.
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

/**
 * If invalid date, then assume it is of unix format and convert that into a date 
 * If the unix format fails to convert into a valid date, the return the following: 
 * return res.json({error: "Invalid Date"}). Input examples shown below.
 * 
 * Date input
 * http://localhost:61142/api/Fri, 25 Dec 2015 00:00:00 GMT 
 * or
 * Date unix format input
 * http://localhost:61142/api/1451001600000
 * or
 * Invalid input
 * http://localhost:61142/api/1213nhjbdsh
 * 
 */
app.get("/api/:date", function (req, res) {

  var echoString = req.params.date;
  var timestamp = Date.parse(echoString);
  var inputDate = null 

  if (isNaN(timestamp) == false) {
    inputDate = new Date(timestamp);
  }
  else{

    inputDate = new Date(echoString * 1);

    // If true then it is of unix format.
    if(isValidDate(inputDate)){
      console.log("Valid unix format.")
    }
    else{
      console.log("Invalid date format.")
      return res.json({error: "Invalid Date"});
    }
  }

  console.log("echoString: " + echoString);
  console.log("inputDate: " + inputDate);
  console.log("inputDate.toUTCString(): " + inputDate.toUTCString());

  var inputDateUnixFormat = inputDate.getTime();
  console.log("inputDateUnixFormat: " + inputDateUnixFormat);

  res.send({"unix": inputDateUnixFormat, "utc": inputDate.toUTCString()});
});

/**
 * When the user does not enter a date, return the current date.
 */
app.get("/api", function(req, res){
  var d = new Date();
  console.log("Empty string was entered!");
  res.send({"unix": d.getTime(), "utc": d.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

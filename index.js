// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// serve static files
app.use(express.static('public'));

// serve HTML file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for greeting
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for timestamp
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // If no date is provided, return the current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If dateParam is a number, treat it as a Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat it as a date string
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // Return the JSON object with unix and utc keys
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
var express = require('express');
var morgan = require('morgan'); // allows us to log info on server side

var hostname = 'localhost';
var port = 3000;

var app = express();

// say that morgan will be one of the middleware used by express
app.use(morgan('dev')); // dev is a preprogrammed log output that morgan supports
function auth (req,res,next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) // then no authorization came in
  {
    var err = new Error('You are not authenticated.');
    err.status = 401; // authorization has failed
    next(err);
    return;
  }
  var auth = new Buffer(authHeader.split(' ')[1],
  'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  // now compare against hardcoded user and pass
  if (user == 'admin' && pass == 'password') // lol this example is dumb
  {
    next(); // authorized
  } else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
  }
}

app.use(auth);

app.use(express.static(__dirname + '/public')); // public is source of static files

// a middleware which specifically handles an error
app.use(function(err,req,res,next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});



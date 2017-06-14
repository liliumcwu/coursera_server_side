var http = require('http');
var fs = require('fs');
var path = require('path'); // ensures that the system uses correct slashes in path names

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res) {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  // check what kind of method, only handle the get method
  // other methods will just be ignored
  if (req.method == 'GET') {
    var fileUrl;
    // if the req.url ends with a slash, dunno why Jogesh thinks the == checks that
    // oh he means, if we search localhost:3000/
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;
    // set up the file path
    var filePath = path.resolve('./public'+fileUrl);

    var fileExt = path.extname(filePath); // would be html in this case

    // since current server will only handle html files
    if (fileExt == '.html') {
      //make sure file actually exists
      fs.exists(filePath, function(exists) {
        if (!exists) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
          return;
        }
        // otherwise
        res.writeHead(200, {'Content-Type': 'Text/html'});
        fs.createReadStream(filePath).pipe(res);
      });
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('<h1>Error 404: ' + fileUrl + ' not an HTML file</h1>');
    }
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Error 404: ' + req.method + ' not supported</h1>');
  }
});

// start the server
server.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
})

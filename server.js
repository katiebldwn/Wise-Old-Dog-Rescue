var express = require('express');
var app = express();


app.use(express.static("/"));


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});


app.listen(8080, function() {
	console.log('App running on port 8080');
})
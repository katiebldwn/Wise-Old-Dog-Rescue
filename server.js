const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('/'));

app.use(bodyParser.json());



app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});


app.listen(8080, function() {
	console.log('App running on port 8080');
})
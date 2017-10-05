const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8080, function() {
    console.log('App running');
})

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');


// app.use(express.static('/'));

// app.use(bodyParser.json());



// app.get("/", (request, response) => {
//   response.sendFile(__dirname + '/index.html');
// });


// // app.listen(8080, function() {
// // 	console.log('App running on port 8080');
// // })

// app.listen(process.env.PORT || 8080, function() {
//     console.log('App running');
// })
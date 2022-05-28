const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.json());
app.use(cors());

const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath));

// // api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.get('/*', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// start server
const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
// const path = require('path');
// const express = require('express');
// const app = express();
// const publicPath = path.join(__dirname, '..', 'build');
// const port = process.env.PORT || 3000;
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });
// app.listen(port, () => {
//   console.log('Hello World I run on PORT ' + port);
// });

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/build'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
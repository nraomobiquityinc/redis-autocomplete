var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var router = require(path.join(__dirname, '/router.js'));
var config = require(path.join(__dirname, '/library/config'))

var app = express();

var viewsDir = path.join(__dirname, '/../../views');
app.use(express.static(viewsDir + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', router);

app.engine('html', exphbs({
  defaultLayout: 'layout',
  extname: '.html',
  partialsDir: viewsDir + '/partials'
}));

app.set('views', viewsDir);
app.set('view engine', 'html');
app.set('view options', {
  layout: 'layout'
});

var nodePort = process.env.PORT || config.port;
app.listen(nodePort, function() {
  console.log('listening on port ' + nodePort);
});

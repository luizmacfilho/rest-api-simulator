// call the packages we need
let express       = require('express');
let bodyParser    = require('body-parser');
let load          = require('express-load');
// let dynamicRoutes = require('./services/dynamicRoutes');

let app = express();
let ip = process.env.IP || 'localhost';
let port = process.env.PORT || 3000;
let address = ip + ':' + port;
// let dynamicRoutesService = new dynamicRoutes.DynamicRoutesService(app, address);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure cross origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// load routes
load('./src/routes').into(app);
// dynamicRoutesService.createRoutes();

// start server
app.listen(port, ip);
// eslint-disable-next-line no-console
console.log('Server started on ' + address);

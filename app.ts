import {Response} from "express";
import {Request} from "express";
'use strict';

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var auth = require('http-auth');
var compression = require('compression');
var methodOverride = require('method-override');

var config = require('./config/config.js');
var confluenceAuth = require('./backend/build/confluenceAuth.js');
var api = require('./backend/build/routes');
var adminApi = require('./backend/build/routes-admin');

var log = require('./backend/build/log.js');

var basicAuth = auth.basic({
    realm: 'Nappikauppa v2 - use your speksi-intra account',
  }, function(username, password, cb) {
    confluenceAuth.auth(username, password, config.confluence_auth.groups.base, cb);
  }
);

var app = express();

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(morgan('combined', {stream: {
  write: function(message) { log.info('HTTP: ' + message); }
}}));

app.use(compression());
app.use('/public/', express.static(path.join(__dirname, '/frontend/build/public')));
app.get('/', function(req, res: any) {
  res.sendFile(__dirname + '/frontend/build/index.html');
});
app.get('/favicon.ico', function(req, res: Response) {
  res.send("");
});

if (config.confluence_auth.enabled) {
  app.all('/admin*', auth.connect(basicAuth));
} else {
  log.warn('=======================================');
  log.warn('NO AUTHENTICATION ENABLED. Fine for dev, not cool for anything real.');
  log.warn('=======================================');
}

app.get('/admin/', function(req, res: Response) {
  res.sendFile(__dirname + '/frontend/build/admin.html');
});

app.use('/api', api);
app.use('/admin-api', adminApi);

// catch 404 and forward to error handler
app.use(function(req: Request, res, next) {
  var err = new Error('Not Found: ' + req.url);
  //err.status = 404; TODO
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: any, res: any, next) {
  log.error("Unhandled error:", err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

export = app;

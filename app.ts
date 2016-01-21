import {Response} from 'express';
import {Request} from 'express';
'use strict';

import util = require('util');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var httpAuth = require('http-auth');
var compression = require('compression');
var methodOverride = require('method-override');

var config = require('./config/config.js');
var auth = require('./backend/build/confluenceAuth.js');
var api = require('./backend/build/routes');
var adminApi = require('./backend/build/routes-admin');

var log = require('./backend/build/log.js');

var basicAuth = httpAuth.basic({
    realm: 'Nappikauppa v2 - use your speksi-intra account'
  }, function(username, password, cb) {
    auth.authenticate(username, password, config.confluence_auth.groups.base, cb);
  }
);

var app = express();
app.enable('trust proxy'); // so that our mod_rewrites doesn't mess up the req.ip address
// app.use(require('connect-livereload')()); // http://stackoverflow.com/questions/28412919/express-server-send-empty-pdf-file

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
  res.send('');
});

if (config.confluence_auth.enabled) {
  app.all('/admin*', httpAuth.connect(basicAuth));
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

app.use(function(req: Request, res, next) {
  res.sendStatus(404);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: any, res: any, next) {
  log.error('Unhandled error:',  util.inspect(err, {showHidden: true, depth: null}));
  res.sendStatus(err.status || 500);
});

export = app;

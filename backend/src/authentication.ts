'use strict';

const config = require('../../config/config.js');
import log = require('./log');

export function isAdmin(user: string) {
  return typeof(user) !== 'undefined';
}

export function authenticate(user: string, password: string, cb: Function) {

  const authenticatedUser = config.admin_users.find(adminUser =>
     adminUser.username === user && adminUser.password === password
  );

  if (!authenticatedUser) {
    log.error('Access denied', {user: user});
    return cb(false);
  }

  log.info('Authencation successful', {user: user});
  return cb(true);
}

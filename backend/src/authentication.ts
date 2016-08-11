'use strict';

const config = require('../../config/config.js');
import log = require('./log');

export function isAdmin(user: string): boolean {
  const authenticatedUser = config.users.find(authUser => authUser.username === user);
  return authenticatedUser !== undefined && authenticatedUser.role === 'admin';
}

export function authenticate(user: string, password: string, role: string, cb: Function) {

  const isAuthenticated = config.users.find(authUser =>
     authUser.username === user && authUser.password === password && (!role || authUser.role === role)
  );

  if (!isAuthenticated) {
    log.error('Access denied', {user: user});
    return cb(false);
  }

  log.info('Authentication successful', {user: user});
  return cb(true);
}

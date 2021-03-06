'use strict';

import db = require('./db');
import log = require('./log');
import mail = require('./mail');
import auth = require('./authentication');
var config = require('../config/config.js');

export interface IDiscountCode {
  code: string;
  eur: number;
  use_max: number;
  used?: number;
  email: string;
  code_group: string;
  email_subject?: string;
  email_text?: string;
}

export function check(code: string, user: string): Promise<any> {
  return db.query('select (:is_admin or ((dc.use_max - count(*)) > 0)) as valid from nk2_orders o \
    join nk2_discount_codes dc on dc.code = o.discount_code \
    where o.discount_code = :discount_code',
  {discount_code: code, is_admin: auth.isAdmin(user)})
  .then((rows) => {
    var ok = (rows[0].valid) === 1;
    log.info('Pre-order validation, discount code "' + code + '" is ' + (ok ? 'valid' : 'invalid') + ' for user ' + user);
    return {ok: ok};
  });
}

export function getAll(): Promise<IDiscountCode[]> {
  return db.query('select code, eur, use_max, if(o.id is null, 0, count(*)) as used, dc.email, code_group from nk2_discount_codes dc \
    left join nk2_orders o on o.discount_code = dc.code \
    where dc.show_in_stats is true \
    group by code');
}

export function createOrUpdate(codes: IDiscountCode[], send: boolean): Promise<IDiscountCode[]> {
  log.info('ADMIN: creating or updating ' + codes.length + ' discount codes');
  var query_start = 'insert into nk2_discount_codes (code, eur, use_max, email, code_group) values ';
  var insert_values = codes.map((code) => db.format('(:code, :eur, :use_max, :email, :code_group)', code));
  var query_end = ' on duplicate key update eur = values(eur), use_max = values(use_max), email = values(email), code_group = values(code_group)';
  return db.query(query_start + insert_values.join(',') + query_end)
  .then((res) => {
    log.info('ADMIN: discount codes created or updated');
    if (send) {
      codes.forEach((code) => {
        mail.sendMail({
          from: config.email.from,
          to: code.email,
          subject: code.email_subject,
          text: code.email_text.replace('$CODE$', code.code).replace('$EUR$', code.eur.toString()).replace('$URL$', config.public_url)
        }, (error, info) => {
          if (error) {
            log.error('ADMIN: Sending code failed', {error: error, code: code});
          }
        });
      });
      log.info('ADMIN: Codes sent');
    }
    return getAll();
  });
}

'use strict';

import db = require('./db');
import log = require('./log');
import order = require('./order');
import _ = require('underscore');

export interface IShow {
  active: boolean;
  description: string;
  id: number;
  inactive_time: string;
  reserved_percentage: number;
  sections: _.Dictionary<IShowSection>; // TODO: ideally just IShowSection[] :(
  time: string;
  title: string;
  venue_id: number;
  discount_groups: IDiscountGroup[];
}

export interface IShowSection {
  section_id: number;
  price: number;
  active: boolean;
}

export interface IDiscountGroup {
  id: number;
  discount: number;
  title: string;
  admin: boolean;
  show_id: number;
}

export interface IReservedSeats {
  reserved_seats: number[];
}

export function getAll(user): Promise<IShow[]> {
  return db.query('select \
      shows.*, \
      (100.0 * reserved.seatcount / total.seatcount) as reserved_percentage, \
      prices.section_id, prices.price, prices.active, \
      groups.id as discount_group_id, groups.title as discount_group_title, groups.eur as discount_group_discount, groups.admin_only as discount_group_admin, groups.show_id as discount_group_show_id \
    from nk2_shows shows \
    join nk2_prices prices on shows.id = prices.show_id and (prices.active = true or :is_admin) \
    left join ( \
      select show_id, count(*) seatcount \
      from nk2_tickets tickets \
      join nk2_orders orders on tickets.order_id = orders.id \
      where orders.status in ("seats-reserved", "payment-pending", "paid") \
      group by show_id \
    ) as reserved on reserved.show_id = shows.id \
    join ( \
      select shows.id as show_id, count(*) seatcount \
      from nk2_shows shows \
      join nk2_sections sections on sections.venue_id = shows.venue_id \
      join nk2_seats seats on seats.section_id = sections.id and seats.bad_seat = false \
      join nk2_prices prices on shows.id = prices.show_id and sections.id = prices.section_id and prices.active = true \
      group by show_id \
    ) as total on total.show_id = shows.id \
    left join nk2_discount_groups groups on \
      (shows.id = groups.show_id or groups.show_id is null) \
      and (:is_admin or groups.admin_only = false) \
      and groups.active = true', {is_admin: typeof(user) !== 'undefined'})
    .then((rows) => {
      var grouped = _.groupBy(rows, 'id');
      var shows = _.mapObject(grouped, function(showRows: any[]) {
        var show: IShow = _.pick(showRows[0], ['id', 'title', 'venue_id', 'time', 'active', 'inactivate_time', 'description', 'reserved_percentage']);
        var sections = _.groupBy(showRows, 'section_id');
        show.sections = _.mapObject(sections, function(sectionRows: any[]) {
          var basePrice = sectionRows[0].price;
          var section = _.pick(sectionRows[0], ['section_id', 'price', 'active']);
          return section;
        });
        show.discount_groups = _.chain(showRows).groupBy('discount_group_id').values().map((discountGroupRows: any[]): IDiscountGroup => {
          return {
            'id': discountGroupRows[0].discount_group_id,
            'title': discountGroupRows[0].discount_group_title,
            'discount': discountGroupRows[0].discount_group_discount,
            'admin': discountGroupRows[0].discount_group_admin,
            'show_id': discountGroupRows[0].discount_group_show_id
          };
        }).value();
        return show;
      });
      return _.values(shows);
    });
}

export function get(show_id: number, user?: string): Promise<IShow> {
  return getAll(user).then((shows: IShow[]) => shows.filter((show2: IShow) => show2.id === show_id)[0])
  .catch((err) => {
    log.error('Getting a show failed', {error: err});
    throw err;
    return null;
  });
}

export function getReservedSeats(show_id): Promise<IReservedSeats> {
  return order.checkExpired()
    .then(() => db.query('select distinct seat_id \
        from nk2_tickets tickets \
        join nk2_orders orders on tickets.order_id = orders.id \
        where show_id = :show_id \
          and orders.status in ("seats-reserved", "payment-pending", "paid") \
        order by seat_id',
        {show_id: show_id}))
    .then((res: {seat_id: number}[]) => {
      var reserved_seats = _.map(res, (s) => s.seat_id);
      return {'reserved_seats': reserved_seats};
    })
    .catch((err) => {
      log.error('Getting reserved seats failed', {error: err, show_id: show_id});
      throw err;
      return null;
    });
}

export function create(show: IShow): Promise<IShow> {
  log.info('ADMIN: Beginning show creation', show);
  return db.query('insert into nk2_shows (title, venue_id, time, active, inactivate_time, description) values (:title, :venue_id, :time, :active, :inactivate_time, :description)', show)
    .then((res) => {
      var show_id = parseInt(res.insertId);
      log.info('ADMIN: Show created, creating prices', {show_id: show_id});
      var query_start = 'insert into nk2_prices (show_id, section_id, price, active) values ';
      var insert_values = _.values(show.sections).map((section: IShowSection) => db.format('(:show_id, :section_id, :price, :active)', _.extend({show_id: show_id}, section)));
      return db.query(query_start + insert_values.join(','))
      .then(() => {
        log.info('ADMIN: Prices created, returning show');
        return get(show_id, 'backend');
      });
    })
    .catch((err) => {
      log.error('ADMIN: Creating a show failed', {error: err});
      return null;
      throw err;
    });
}

export function update(show_id: number, show: IShow): Promise<IShow> {
  log.info('ADMIN: Beginning show update', show);
  return db.query('update nk2_shows set title = :title, venue_id = :venue_id, time = :time, active = :active, inactivate_time = :inactivate_time, description = :description where id = :id', show)
  .then((res) => {
    log.info('ADMIN: Show updated, updating prices');
    var query_start = 'insert into nk2_prices (show_id, section_id, price, active) values ';
    var insert_values = _.values(show.sections).map((section: IShowSection) => db.format('(:show_id, :section_id, :price, :active)', _.extend({show_id: show_id}, section)));
    var query_end = ' on duplicate key update price = values(price), active = values(active)';

    return db.query(query_start + insert_values.join(',') + query_end).then(() => {
      log.info('ADMIN: Prices updated, returning show');
      return get(show_id, 'backend');
    });
  })
  .catch((err) => {
    log.error('ADMIN: Updating a show failed', {error: err});
    return null;
    throw err;
  });
}

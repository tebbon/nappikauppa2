import Dictionary = _.Dictionary;
'use strict';

import db = require('./db');
import log = require('./log');
import _ = require('underscore');

export interface ISeat {
  id: number;
  row: string;
  number: string;
  x_coord: number;
  y_coord: number;
  bad_seat: boolean;
}

export interface ISection {
  id: number;
  seat_count: number;
  section_title: string;
  row_name: string;

  seats: Dictionary<ISeat>;
}

export interface IVenue {
  description: string;
  venue_title: string;
  ticket_type: string;

  sections: Dictionary<ISection>;
}

export function get(venue_id): Promise<any> {
  return db.query('SELECT \
    venue.id as venue_id, \
    venue.title as venue_title, \
    venue.description, \
    venue.ticket_type, \
    section.id as section_id, \
    section.title as section_title, \
    section.row_name, \
    section.seat_count, \
    seat.id as seat_id, \
    seat.row, \
    seat.number, \
    seat.x_coord, \
    seat.y_coord, \
    bad_seat \
  FROM nk2_venues venue \
  JOIN nk2_sections section ON venue.id = section.venue_id \
  LEFT OUTER JOIN nk2_seats seat ON section.id = seat.section_id \
  WHERE venue.id=:venue_id',
    {venue_id: venue_id})
  .then((dbRows) => {
    var first = dbRows[0];
    // convert the sql results into a json tree
    // begins with venue info
    var res: IVenue = _.pick(first, ['venue_title', 'description', 'ticket_type']);

    // groupBy creates a dictionary (object) containing lists
    // so convert those lists into objects with section info
    var sections = _.groupBy(dbRows, (dbRow: any) => dbRow.section_id );
    res.sections = _.mapObject(sections, (dbRowsForSection: any) => {
      first = dbRowsForSection[0]; // dbRowsForSection is a list of seats

      var section: ISection = _.pick(first, ['section_title', 'row_name', 'seat_count']);
      section.id = first.section_id; // we want to call this 'id' instead of 'section_id'

      // turn seats into a dictionary with indexBy and use mapObject to strip venue & section info
      var seats = _.indexBy(dbRowsForSection, (dbRow: any) => dbRow.seat_id);
      section.seats = _.mapObject(seats, (dbRowForSeat: any) => {
        var seat: ISeat = _.pick(dbRowForSeat, ['seat_id', 'row', 'number', 'x_coord', 'y_coord', 'bad_seat']);
        seat.id = dbRowForSeat.seat_id; // we want to call this 'id' instead of 'seat_id'
        return seat;
      });

      return section;
    });
    return res;
  })
  .catch((err) => {
    log.error('Getting venue details failed', {venue_id: venue_id});
    throw err;
  });
}

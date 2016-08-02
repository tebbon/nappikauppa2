-- Base data for OMS-teatteri shop, quickndirty hax

start transaction;

insert into nk2_productions (id, title, performer, opens, active, ticket_image_src, description) values
  (1, 'HYLJE - Musta musikaalikomedia', 'OMS-teatteri', '2015-08-08 13:00:00', true, 'lippu_dummy.png', 'OMS-teatterin esityksen kuvaus tähän.\nJa vielä parempaa tekstiä, Harsa syntyykö sulta jotain lennokasta?');
 
insert into nk2_shows (title, production_id, venue_id, time, active, inactivate_time, description) values
    ('Ensi-ilta', 1, 9, '2016-10-13 19:00:00', true, '2016-10-13 17:00:00', 'HYLJE ensi-ilta on Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-14 19:00:00', true, '2016-10-14 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-18 19:00:00', true, '2016-10-18 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-19 19:00:00', true, '2016-10-19 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-20 19:00:00', true, '2016-10-20 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-21 19:00:00', true, '2016-10-21 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-25 19:00:00', true, '2016-10-25 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-26 19:00:00', true, '2016-10-26 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-27 19:00:00', true, '2016-10-27 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!'),
    ('Esitys', 1, 9, '2016-10-28 19:00:00', true, '2016-10-28 17:00:00', 'HYLJE esitetään Konepajan Brunossa, Aleksis Kiven katu 17a, Helsinki. Tervetuloa katsomaan uskomatonta taidetta!');

insert into nk2_prices (show_id, section_id, price, active) values
    (1,16,26,true),
    (1,17,30,true),
    (1,18,26,true),
    (1,19,26,true),
    (1,20,20,true);


commit;

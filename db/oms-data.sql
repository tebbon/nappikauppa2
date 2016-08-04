-- Base data for OMS-teatteri shop, quickndirty hax

start transaction;

insert into nk2_productions (id, title, performer, opens, active, ticket_image_src, description) values
  (1, 'HYLJE - Musta musikaalikomedia', 'OMS-teatteri', '2015-08-08 13:00:00', true, 'lippu_dummy.png', 'OMS-teatterin esityksen kuvaus tähän.\nJa vielä parempaa tekstiä, Harsa syntyykö sulta jotain lennokasta?');
 

commit;

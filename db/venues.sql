insert into nk2_venues (id, title, ticket_type, description, layout_src) values
  (1, 'Konepajan Bruno', 'numbered-seats', 'Konepajan Bruno\nAleksis Kiven katu 17b, Helsinki', 'konepajanbruno.png');

insert into nk2_sections (id, venue_id, title, row_name) values
  (1, 1, 'Oikea', 'rivi'), -- Bruno, stage right blokki
  (2, 1, 'Keski', 'rivi'), -- Bruno, keskiblokki etupaikat
  (3, 1, 'Keski', 'rivi'), -- Bruno, keskiblokki takapaikat
  (4, 1, 'Vasen', 'rivi'), -- Bruno, stage left blokki
  (5, 1, 'Taka', 'rivi'); -- Bruno, takarivi

-- NOTE: to "easily" edit the seat coordinates, one can for example copy all the seats of a venue into a file 't', and then run
-- cat t|awk '{print "  "$1, $2, $3, $4-33 ",", $5+32",",$6}' to change x-coordinates to x = x-33 and y-coordinates to y = y+32

  -- Bruno seats
insert into nk2_seats (number, row, section_id, x_coord, y_coord, inactive) values
(1,1,1,205,20,FALSE),
(2,1,1,205,30,FALSE),
(3,1,1,205,40,FALSE),
(4,1,1,205,50,FALSE),
(5,1,1,205,60,FALSE),
(6,1,1,205,70,FALSE),
(7,1,1,205,80,FALSE),
(8,1,1,205,90,FALSE),
(9,1,1,205,100,FALSE),
(10,1,2,205,130,FALSE),
(11,1,2,205,140,FALSE),
(12,1,2,205,150,FALSE),
(13,1,2,205,160,FALSE),
(14,1,2,205,170,FALSE),
(15,1,2,205,180,FALSE),
(16,1,2,205,190,FALSE),
(17,1,2,205,200,FALSE),
(18,1,2,205,210,FALSE),
(19,1,2,205,220,FALSE),
(20,1,2,205,230,FALSE),
(21,1,2,205,240,FALSE),
(22,1,2,205,250,FALSE),
(23,1,2,205,260,FALSE),
(24,1,2,205,270,FALSE),
(25,1,2,205,280,FALSE),
(26,1,2,205,290,FALSE),
(27,1,2,205,300,FALSE),
(28,1,2,205,310,FALSE),
(29,1,2,205,320,FALSE),
(30,1,2,205,330,FALSE),
(31,1,2,205,340,FALSE),
(32,1,2,205,350,FALSE),
(33,1,4,205,380,FALSE),
(34,1,4,205,390,FALSE),
(35,1,4,205,400,FALSE),
(36,1,4,205,410,FALSE),
(37,1,4,205,420,FALSE),
(38,1,4,205,430,FALSE),
(39,1,4,205,440,FALSE),
(40,1,4,205,450,FALSE),
(41,1,4,205,460,FALSE),
(42,2,1,170,20,FALSE),
(43,2,1,170,30,FALSE),
(44,2,1,170,40,FALSE),
(45,2,1,170,50,FALSE),
(46,2,1,170,60,FALSE),
(47,2,1,170,70,FALSE),
(48,2,1,170,80,FALSE),
(49,2,1,170,90,FALSE),
(50,2,1,170,100,FALSE),
(51,2,2,170,130,FALSE),
(52,2,2,170,140,FALSE),
(53,2,2,170,150,FALSE),
(54,2,2,170,160,FALSE),
(55,2,2,170,170,FALSE),
(56,2,2,170,180,FALSE),
(57,2,2,170,190,FALSE),
(58,2,2,170,200,FALSE),
(59,2,2,170,210,FALSE),
(60,2,2,170,220,FALSE),
(61,2,2,170,230,FALSE),
(62,2,2,170,240,FALSE),
(63,2,2,170,250,FALSE),
(64,2,2,170,260,FALSE),
(65,2,2,170,270,FALSE),
(66,2,2,170,280,FALSE),
(67,2,2,170,290,FALSE),
(68,2,2,170,300,FALSE),
(69,2,2,170,310,FALSE),
(70,2,2,170,320,FALSE),
(71,2,2,170,330,FALSE),
(72,2,2,170,340,FALSE),
(73,2,2,170,350,FALSE),
(74,2,4,170,380,FALSE),
(75,2,4,170,390,FALSE),
(76,2,4,170,400,FALSE),
(77,2,4,170,410,FALSE),
(78,2,4,170,420,FALSE),
(79,2,4,170,430,FALSE),
(80,2,4,170,440,FALSE),
(81,2,4,170,450,FALSE),
(82,2,4,170,460,FALSE),
(83,3,1,135,20,FALSE),
(84,3,1,135,30,FALSE),
(85,3,1,135,40,FALSE),
(86,3,1,135,50,FALSE),
(87,3,1,135,60,FALSE),
(88,3,1,135,70,FALSE),
(89,3,1,135,80,FALSE),
(90,3,1,135,90,FALSE),
(91,3,1,135,100,FALSE),
(92,3,2,135,130,FALSE),
(93,3,2,135,140,FALSE),
(94,3,2,135,150,FALSE),
(95,3,2,135,160,FALSE),
(96,3,2,135,170,FALSE),
(97,3,2,135,180,FALSE),
(98,3,2,135,190,FALSE),
(99,3,2,135,200,FALSE),
(100,3,2,135,210,FALSE),
(101,3,2,135,220,FALSE),
(102,3,2,135,230,FALSE),
(103,3,2,135,240,FALSE),
(104,3,2,135,250,FALSE),
(105,3,2,135,260,FALSE),
(106,3,2,135,270,FALSE),
(107,3,2,135,280,FALSE),
(108,3,2,135,290,FALSE),
(109,3,2,135,300,FALSE),
(110,3,2,135,310,FALSE),
(111,3,2,135,320,FALSE),
(112,3,2,135,330,FALSE),
(113,3,2,135,340,FALSE),
(114,3,2,135,350,FALSE),
(115,3,4,135,380,FALSE),
(116,3,4,135,390,FALSE),
(117,3,4,135,400,FALSE),
(118,3,4,135,410,FALSE),
(119,3,4,135,420,FALSE),
(120,3,4,135,430,FALSE),
(121,3,4,135,440,FALSE),
(122,3,4,135,450,FALSE),
(123,3,4,135,460,FALSE),
(124,4,1,100,20,FALSE),
(125,4,1,100,30,FALSE),
(126,4,1,100,40,FALSE),
(127,4,1,100,50,FALSE),
(128,4,1,100,60,FALSE),
(129,4,1,100,70,FALSE),
(130,4,1,100,80,FALSE),
(131,4,1,100,90,FALSE),
(132,4,1,100,100,FALSE),
(133,4,3,100,130,FALSE),
(134,4,3,100,140,FALSE),
(135,4,3,100,150,FALSE),
(136,4,3,100,160,FALSE),
(137,4,3,100,170,FALSE),
(138,4,3,100,180,FALSE),
(139,4,3,100,190,FALSE),
(140,4,3,100,200,FALSE),
(141,4,3,100,210,FALSE),
(142,4,3,100,220,FALSE),
(143,4,3,100,230,FALSE),
(144,4,3,100,240,FALSE),
(145,4,3,100,250,FALSE),
(146,4,3,100,260,FALSE),
(147,4,3,100,270,FALSE),
(148,4,3,100,280,FALSE),
(149,4,3,100,290,FALSE),
(150,4,3,100,300,FALSE),
(151,4,3,100,310,FALSE),
(152,4,3,100,320,FALSE),
(153,4,3,100,330,FALSE),
(154,4,3,100,340,FALSE),
(155,4,3,100,350,FALSE),
(156,4,4,100,380,FALSE),
(157,4,4,100,390,FALSE),
(158,4,4,100,400,FALSE),
(159,4,4,100,410,FALSE),
(160,4,4,100,420,FALSE),
(161,4,4,100,430,FALSE),
(162,4,4,100,440,FALSE),
(163,4,4,100,450,FALSE),
(164,4,4,100,460,FALSE),
(165,5,1,65,20,FALSE),
(166,5,1,65,30,FALSE),
(167,5,1,65,40,FALSE),
(168,5,1,65,50,FALSE),
(169,5,1,65,60,FALSE),
(170,5,1,65,70,FALSE),
(171,5,1,65,80,FALSE),
(172,5,1,65,90,FALSE),
(173,5,1,65,100,FALSE),
(174,5,3,65,130,FALSE),
(175,5,3,65,140,FALSE),
(176,5,3,65,150,FALSE),
(177,5,3,65,160,FALSE),
(178,5,3,65,170,FALSE),
(179,5,3,65,180,FALSE),
(180,5,3,65,190,FALSE),
(181,5,3,65,200,FALSE),
(182,5,3,65,210,FALSE),
(183,5,3,65,220,FALSE),
(184,5,3,65,230,FALSE),
(185,5,3,65,240,FALSE),
(186,5,3,65,250,FALSE),
(187,5,3,65,260,FALSE),
(188,5,3,65,270,FALSE),
(189,5,3,65,280,FALSE),
(190,5,3,65,290,FALSE),
(191,5,3,65,300,FALSE),
(192,5,3,65,310,FALSE),
(193,5,3,65,320,FALSE),
(194,5,3,65,330,FALSE),
(195,5,3,65,340,FALSE),
(196,5,3,65,350,FALSE),
(197,5,4,65,380,FALSE),
(198,5,4,65,390,FALSE),
(199,5,4,65,400,FALSE),
(200,5,4,65,410,FALSE),
(201,5,4,65,420,FALSE),
(202,5,4,65,430,FALSE),
(203,5,4,65,440,FALSE),
(204,5,4,65,450,FALSE),
(205,5,4,65,460,FALSE),
(206,6,5,30,45,FALSE),
(207,6,5,30,55,FALSE),
(208,6,5,30,65,FALSE),
(209,6,5,30,75,FALSE),
(210,6,5,30,85,FALSE),
(211,6,5,30,95,FALSE),
(212,6,5,30,105,FALSE),
(213,6,5,30,125,FALSE),
(214,6,5,30,135,FALSE),
(215,6,5,30,145,FALSE),
(216,6,5,30,155,FALSE),
(217,6,5,30,165,FALSE),
(218,6,5,30,175,FALSE),
(219,6,5,30,185,FALSE),
(220,6,5,30,295,FALSE),
(221,6,5,30,305,FALSE),
(222,6,5,30,315,FALSE),
(223,6,5,30,325,FALSE),
(224,6,5,30,335,FALSE),
(225,6,5,30,345,FALSE),
(226,6,5,30,355,FALSE),
(227,6,5,30,375,FALSE),
(228,6,5,30,385,FALSE),
(229,6,5,30,395,FALSE),
(230,6,5,30,405,FALSE),
(231,6,5,30,415,FALSE),
(232,6,5,30,425,FALSE),
(233,6,5,30,435,FALSE);


select
    venues.title,
    sections.title,
    sections.row_name,
    seats.row,
    sum(1) as 'number of seats'
from nk2_seats seats
  join nk2_sections sections on seats.section_id = sections.id
  join nk2_venues venues on sections.venue_id = venues.id
group by sections.id, seats.row;

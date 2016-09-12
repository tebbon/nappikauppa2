SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
start transaction;

alter table nk2_discount_codes add `show_in_stats` boolean not null default true;

commit;

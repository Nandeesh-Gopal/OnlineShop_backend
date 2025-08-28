create database onlineShop;
use onlineShop;
create table users(
	id int auto_increment primary key,
    name varchar(25),
    email varchar(50) unique,
    password varchar(50)
)
select * from users;
truncate users;
truncate cart;
truncate products

drop table users;
delete from cart where user_id is null
create table product(
	id int auto_increment primary key,
	product varchar(20),
    description varchar(50),
    prize int,
    stock int
)
select * from product;
drop table product;

alter table users add phonenumber int

create table cart(
	id int auto_increment primary key,
    user_id int,
    foreign key (user_id) references users(id) on delete cascade
)
drop table cart;
create table cart_items(
	id int auto_increment primary key,
    cart_id int,
    product_id int,
    quantity int,
    foreign key (cart_id) references cart(id) on delete cascade,
    foreign key (product_id) references product(id) on delete cascade
)
select * from cart
alter table cart drop column product_id
delete from users
delete from cart
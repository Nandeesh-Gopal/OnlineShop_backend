create table users(
	id int auto_increment primary key,
    name varchar(25),
    email varchar(50) unique,
    password varchar(50),
    phonenumber int
)
create table product(
	id int auto_increment primary key,
	product varchar(20),
    description varchar(50),
    prize int,
    stock int
)
use onlineshop
select * from product
create table cart(
	id int auto_increment primary key,
    user_id int,
    foreign key (user_id) references users(id) on delete cascade
)
create table cart_items(
	id int auto_increment primary key,
    cart_id int,
    product_id int,
    quantity int,
    foreign key (cart_id) references cart(id) on delete cascade,
    foreign key (product_id) references product(id) on delete cascade
)
create table orders(
	id int auto_increment primary key,
    productid int,
    productname varchar(50),
    productprice int,
    quantity int,
    address varchar(50),
    total int,
    phone int
)

select * from product where id = 8
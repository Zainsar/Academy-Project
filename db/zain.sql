create database acadmy;

use acadmy;

create table admin_signup(
admin_id int unique not null identity(1,1),
email varchar(255) not null unique,
username varchar(255) not null,
adpassword varchar(255) not null,
age int,
adaddress varchar(255),
phone varchar(255)
);

select * from admin_signup;

insert into admin_signup(email,username,adpassword,age,adaddress,phone) values('sohaibsarfraz@gmail.com','admin25','admin123',20,'north Karachi','03172667345');


create table franchise_signup(
fran_id int unique not null identity(1,1),
email varchar(255) not null unique,
username varchar(255) not null,
adpassword varchar(255) not null,
age int,
adaddress varchar(255),
phone varchar(255),
status varchar(255) default('Active')
);

select * from franchise_signup;

insert into franchise_signup(email,username,adpassword,age,adaddress,phone) values('zainsarfraz82@gmail.com','admin','admin',21,'north Karachi','03172667345');

update franchise_signup set username = 'Aptech';

create table Courses_timing(
time_id int not null primary key identity(1,1),
timestart Varchar(255),
timeend Varchar(255)
);

insert into Courses_timing(timestart,timeend) values('9:00am','11:00am'),
('11:00am','1:00pm'),
('1:00pm','3:00pm'),
('3:00pm','5:00pm'),
('5:00pm','7:00pm'),
('7:00pm','9:00pm'),
('9:00pm','11:00pm')

select * from Courses_timing

update Courses_timing set timestart ='7:00am' where time_id=1 

create table Courses(
Courses_id int not null primary key identity(1,1),
Courses_Name varchar(255) not null,
Courses_Tduration varchar(255),
Courses_Mduration varchar(255),
time_id int,
Courses_days varchar(255),
Course_fees int,
Course_status varchar(255) default('Active'),
FOREIGN KEY (Courses_id) REFERENCES Courses_timing(time_id)
);

insert into Courses(Courses_Name,Courses_Tduration,Courses_Mduration,time_id,Courses_days,Course_fees) values('PHP','2Hours','3Month',1,'Monday to Friday',7000);

select * from Courses

select * from Courses as c join Courses_timing as t on c.Courses_id = t.time_id

create table own_course(
own_id int not null primary key identity(1,1),
Course_id int,
Franchise_id int,
FOREIGN KEY (own_id) REFERENCES Courses(Courses_id),
FOREIGN KEY (own_id) REFERENCES franchise_signup(fran_id)
);

select * from own_course

insert into own_course(Course_id,Franchise_id) values(1,1)

select c.Courses_Name,c.Courses_days,c.Courses_Mduration,fs.phone,fs.username from own_course as oc join Courses as c on oc.own_id = c.Courses_id join franchise_signup as fs on oc.own_id = fs.fran_id
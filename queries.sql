-- create a db 
CREATE DATABASE `<your_db_name>` /*!40100 DEFAULT CHARACTER SET latin1 */;

use <your_db_name>;
-- make sure you have a databse login and create a table as below

--create a table
CREATE TABLE fromto (
    Bus_id int AUTO_INCREMENT PRIMARY KEY,
    Bus_name varchar(255),
    Date DATETIME DEFAULT '2021-10-26 14:30:00',
    Departure varchar(255),
    Arrival varchar(255),
    NumberOfSeats int,
    Bus_fare int,
);

--inserting values
INSERT INTO `fromto` VALUES (1001, 'Shivneri-AC', CURDATE(), 'Pune', 'Mumbai', 50, 500);
INSERT INTO `fromto` VALUES (1002, 'Ashwamedh-AC', CURDATE(), 'Mumbai', 'Pune', 50, 500);

--showing all
select * from fromto;




SELECT `fromto`.`Bus_id`,
    `fromto`.`Bus_name`,
    `fromto`.`Date`,
    `fromto`.`Departure`,
    `fromto`.`Arrival`,
    `fromto`.`NumberOfSeats`,
    `fromto`.`Bus_fare`
FROM `bus_manage_system`.`fromto`;

-- these are for reference made for testing purposes 
-- PLEASE DO INPUT YOUR CORRECT DB NAME AND ITS RESPECTIVE TABLE
-- ENSURE VALUES REPRESENT AS IN HERE ie Bus_id, Bus_name, etc....


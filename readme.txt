//go to sql directory in order to start typing sql command
cd C:\Program Files\MySQL\MySQL Server 8.0\bin

//Login to my database server
mysql -u wwong -p 
-> Enter Password

//Open my database from server
use (databasename)

//Display my database tables information
show tables;

//QUERY:
SELECT * FROM users
// Returns only distinct values (different) Example:
SELECT DISTINCT username FROM users WHERE firstname="Constance" AND surname="Markiewicz";
// ADD COLUMN
ALTER TABLE products ADD COLUMN dimensions VARCHAR(10);

//Datatype: 
CHARACTER [(length)] or CHAR [(length)]
VARCHAR (length)
BOOLEAN
SMALLINT
INTEGER or INT
DECIMAL [(p[,s])] or DEC [(p[,s])]
NUMERIC [(p[,s])]
REAL
FLOAT(p)
DOUBLE PRECISION
DATE
TIME
TIMESTAMP
CLOB [(length)] or CHARACTER LARGE OBJECT [(length)] or CHAR LARGE OBJECT [(length)]
BLOB [(length)] or BINARY LARGE OBJECT [(length)]

// Add data 
INSERT INTO products(id, title, dimensions) VALUES("0002", "Dell Optical Mouse", "10x3x5m");

INSERT IN () SELECT()

UPDATE users SET password='abcde123456679' WHERE username="user07";

// Create Table
CREATE TABLE `users2` (
  `username` varchar(30) DEFAULT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SELECT name,date,likes,comments,author FROM images WHERE img_id=

ALTER TABLE `table` AUTO_INCREMENT = number;

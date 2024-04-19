CREATE DATABASE student_id_card;

USE student_id_card;
drop table student_details;
CREATE TABLE student_details(
	UID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Roll VARCHAR(30) CHECK(Roll LIKE '%/%/%'),
    Dept VARCHAR(10) NOT NULL,
    DOB DATE NOT NULL,
    Address VARCHAR(100) NOT NULL,
    State VARCHAR(20) NOT NULL,
    Pincode INT(10) NOT NULL,
    Contact1 BIGINT NOT NULL,
    Contact2 BIGINT,
    Valid_upto DATE,
    Blood_grp VARCHAR(5),
    Issue_date DATE
);

CREATE TABLE teacher_details(
	UID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Designation VARCHAR(20) NOT NULL,
    Dept VARCHAR(10) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    State VARCHAR(20) NOT NULL,
    Pincode INT(10) NOT NULL,
    Contact1 BIGINT NOT NULL,
    Contact2 BIGINT,
    Blood_grp VARCHAR(5)
);

INSERT INTO student_details VALUES
("U12048", "Mainak", "BTECH/CSE-DS/048", "CSE-DS", "2002-12-27", "Janai Simlaipara, Hooghly", "West Bengal", 712304, 9748643001, 9007712580, "2002-12-27", "B+", "2002-12-27");
SELECT * from student_details;
DELETE from student_details WHERE 1=1;

INSERT INTO teacher_details VALUES
("283", "Mainak", "Professor", "CSE-DS", "Janai Simlaipara, Hooghly", "West Bengal", 712304, 9748643001, 9007712580, "B+");
SELECT * from teacher_details;
DELETE from teacher_details WHERE 1=1;
SET SQL_SAFE_UPDATES = 0;
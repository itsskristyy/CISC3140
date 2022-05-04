#!/bin/bash
sqlite3 lab4.db << 'EOS'
-- display output with headers
.headers ON
-- indicate that data is in csv format
.mode csv
-- drop tables if they already exist
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Owners;
-- create Cars table
CREATE TABLE Cars(
Car_ID INT PRIMARY KEY,
Year INT,
Make TEXT,
Model TEXT,
Racer_Turbo INT,
Racer_Supercharged INT,
Racer_Performance INT,
Racer_Horsepower INT,
Car_Overall INT,
Engine_Modifications INT,
Engine_Performance INT,
Engine_Chrome INT,
Engine_Detailing INT,
Engine_Cleanliness INT,
Body_Frame_Undercarriage INT,
Body_Frame_Suspension INT,
Body_Frame_Chrome INT,
Body_Frame_Detailing INT,
Body_Frame_Cleanliness INT,
Mods_Paint INT,
Mods_Body INT,
Mods_Wrap INT,
Mods_Rims INT,
Mods_Interior INT,
Mods_Other INT,
Mods_ICE INT,
Mods_Aftermarket INT,
Mods_WIP INT,
Mods_Overall INT
);
-- create Owners table
CREATE TABLE Owners(
    Car_ID INT PRIMARY KEY,
    Name TEXT,
    Email TEXT
);
-- create a temporary table with all columns in CSV file
CREATE TEMP TABLE _csv_import (
Timestamp DATETIME,
Email TEXT,
Name TEXT,
Year INT,
Make TEXT,
Model TEXT,
Car_ID INT,
Judge_ID TEXT,
Judge_Name TEXT,
Racer_Turbo INT,
Racer_Supercharged INT,
Racer_Performance INT,
Racer_Horsepower INT,
Car_Overall INT,
Engine_Modifications INT,
Engine_Performance INT,
Engine_Chrome INT,
Engine_Detailing INT,
Engine_Cleanliness INT,
Body_Frame_Undercarriage INT,
Body_Frame_Suspension INT,
Body_Frame_Chrome INT,
Body_Frame_Detailing INT,
Body_Frame_Cleanliness INT,
Mods_Paint INT,
Mods_Body INT,
Mods_Wrap INT,
Mods_Rims INT,
Mods_Interior INT,
Mods_Other INT,
Mods_ICE INT,
Mods_Aftermarket INT,
Mods_WIP INT,
Mods_Overall INT
);
-- import the data from the file to the temporary table
.import data.csv _csv_import
-- add data from temporary table to Cars table
INSERT INTO Cars (Car_ID, Year, Make, Model,
Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower,
Car_Overall,
Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness,
Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness,
Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP,
Mods_Overall)
SELECT Car_ID, Year, Make, Model,
Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower,
Car_Overall,
Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness,
Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness,
Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP,
Mods_Overall
FROM _csv_import WHERE 1;
-- delete top row of Cars table
DELETE FROM Cars WHERE Car_ID = 'Car_ID';
-- add data from temporary table to Owners table
INSERT INTO Owners (Car_ID, Name, Email) SELECT Car_ID, Name, Email
FROM _csv_import WHERE 1;
-- delete top row of Owners table
DELETE FROM Owners WHERE Car_ID = 'Car_ID';
-- drop the temporary table
DROP TABLE _csv_import;
-- indicate the end of the script
EOS

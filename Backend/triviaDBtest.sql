DROP DATABASE IF EXISTS triviaDBtest;
CREATE DATABASE triviaDBtest;

USE triviaDBtest;

CREATE TABLE player(
playerName VARCHAR(45) PRIMARY KEY NOT NULL,
playerPassword VARCHAR(400) NOT NULL);

CREATE TABLE game(
gameId INT PRIMARY KEY AUTO_INCREMENT,
playerName VARCHAR(45) NOT NULL,
category VARCHAR(45) NOT NULL,
score INT NOT NULL,
correct INT NULL,
wrong INT  NULL,
FOREIGN KEY (playerName) REFERENCES player(playerName));
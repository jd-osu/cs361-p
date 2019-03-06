-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Mar 05, 2019 at 04:38 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs361_dimedioj`
--

-- --------------------------------------------------------
--
-- Table structure for table `sidewalk`
--

CREATE TABLE `street` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `sidewalk`
--

CREATE TABLE `sidewalk` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `street_name` varchar(45) NOT NULL,
  `cross_1` varchar(45) NOT NULL,
  `cross_2` varchar(45) NOT NULL,
  PRIMARY KEY (`street_name`, `cross_1`, `cross_2`),
  FOREIGN KEY (`street_name`) REFERENCES `street` (`name`) ON DELETE CASCADE,
  FOREIGN KEY (`cross_1`) REFERENCES `street` (`name`) ON DELETE CASCADE,
  FOREIGN KEY (`cross_2`) REFERENCES `street` (`name`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `user_sidewalk`
--

CREATE TABLE `user_sidewalk` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `sidewalk_id` smallint(5) UNSIGNED NOT NULL,
  `adoption_date` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`user_id`, `sidewalk_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`sidewalk_id`) REFERENCES `sidewalk` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `street` (`name`) VALUES	('NE Knott St'),
										('NE 7th Ave'),
										('NE 8th Ave'),
										('NE 9th Ave'),
										('NE 10th Ave'),
										('NE 11th Ave'),
										('NE 12th Ave'),
										('NE 13th Ave'),
										('NE 14th Ave'),
										('NE 15th Ave');

INSERT INTO `user_tbl` (`first_name`, `last_name`) VALUES	('John', 'Johnson'),
															('Jack', 'Jackson'),
															('Sally', 'Sallyson');
															
INSERT INTO `sidewalk` (`street_name`, `cross_1`, `cross_2`) VALUES	('NE Knott St', 'NE 7th Ave', 'NE 8th Ave'),
																('NE Knott St', 'NE 8th Ave', 'NE 9th Ave'),
																('NE Knott St', 'NE 9th Ave', 'NE 10th Ave'),
																('NE Knott St', 'NE 10th Ave', 'NE 10th Ave'),
																('NE Knott St', 'NE 10th Ave', 'NE 12th Ave'),
																('NE Knott St', 'NE 12th Ave', 'NE 13th Ave'),
																('NE Knott St', 'NE 13th Ave', 'NE 14th Ave'),
																('NE Knott St', 'NE 14th Ave', 'NE 15th Ave');

LOCK TABLES `user_sidewalk` WRITE;
INSERT INTO `user_sidewalk` VALUES (1, 2, 3, '2019-01-02', 'Dirty', 'The Alley'),(2, 1, 2, '2019-02-03', 'Messy', 'The Hideyhole'),(3, 3, 1, '2019-03-04', 'Clean', 'Fancy Pants');
UNLOCK TABLES;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


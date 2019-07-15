-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: wwong_db
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `imgid` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `text` text NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (35,11,1,'2019-04-09 14:24:49','why?','wwong'),(36,18,1,'2019-04-09 14:25:59','becuz you are dumb!','linhhate'),(37,11,9,'2019-04-09 14:41:18','robotic car makes me headache!!!!','wwong'),(38,11,5,'2019-04-09 16:33:48','hi','wwong'),(39,18,10,'2019-04-09 16:53:09','Yes, you are always late!','linhhate');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `images` (
  `img_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date` datetime DEFAULT NULL,
  `likes` int(255) NOT NULL,
  `comments` int(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `description` tinytext,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'1image_test.JPG','2019-04-05 18:50:09',2,2,'wwong','I have no idea how to finish all the IDM projects!!!!!!!'),(2,'2WhatsApp Image 2019-04-05 at 2.10.49 PM.jpeg','2019-04-05 18:54:10',1,0,'wwong','IDM\'s finishing me!'),(3,'3385_developer_comics_packages_downloading.jpg','2019-04-05 22:30:44',0,0,'wwong','How many NPM packages I have to install???!!!'),(4,'4download.png','2019-04-05 22:31:40',1,0,'wwong','All I want is SLEEP!'),(5,'5tumblr_nvd4cuWRrz1ql814fo1_500.jpg','2019-04-05 22:32:43',0,1,'wwong','S.T.R.E.S.S!!!'),(6,'61.jpg','2019-04-05 22:33:50',0,0,'wwong','When is the semester ENDS?'),(7,'7serengeti.jpg','2019-04-06 23:24:49',0,0,'user02','So windy today'),(8,'8283664.jpg','2019-04-06 23:25:49',0,0,'user02','I am always thinking...'),(9,'9headache.jpg','2019-04-09 14:36:42',1,1,'ramyasrini','I have all these now!!!!'),(10,'10image.png','2019-04-09 16:34:42',1,1,'wwong','I dont care if I am late!');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `imgid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (47,11,1),(48,11,2),(49,11,9),(50,11,4),(51,18,10),(52,18,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gMhaol_1','Gráine','Mhaol','5zXRfA!Y^W'),(2,'user02','Constance','Markiewicz','6D8?T@hTGB'),(3,'user03','Maud','Gonne','d28&M!H4~?'),(4,'user04','Queen','Medb','3T~4sBCy~@'),(5,'user05','Hanna','Sheehy-Skeffington','HRq8pvPk8+'),(6,'user06','Eva','Gore-Booth','>k5jN6#88r'),(7,'user07','Augusta','Lady Gregory','abcde123456679'),(8,'user08','Anna','Parnell','G3>gY&yUZv'),(9,'user09','Peig','Sayers','B2jRa%!Gd&'),(10,'user10','Alice','Perry','Ehz2Hq2^K&'),(11,'wwong','Woon Him','WONG','ihateidm'),(18,'linhhate','Linh','Nguyen','hatehatehate'),(19,'ramyasrini','Ramya','Srinivasan','imdone!');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'wwong_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-09 18:13:08

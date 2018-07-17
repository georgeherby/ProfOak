use prof_oak;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `moves`
--

DROP TABLE IF EXISTS `moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `moves` (
  `move_id` int(11) DEFAULT NULL,
  `move_name` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `move_type` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `move_damage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moves`
--

LOCK TABLES `moves` WRITE;
/*!40000 ALTER TABLE `moves` DISABLE KEYS */;
INSERT INTO `moves` VALUES (1,'Aerial Ace','C',0),(2,'Air Cutter','C',0),(3,'Ancient Power','C',0),(4,'Aqua Jet','C',0),(5,'Aqua Tail','C',0),(6,'Aurora Beam','C',0),(7,'Avalanche','C',0),(8,'Blizzard','C',0),(9,'Body Slam','C',0),(10,'Bone Club','C',0),(11,'Brave Bird','C',0),(12,'Brick Break','C',0),(13,'Bubble Beam','C',0),(14,'Bug Buzz','C',0),(15,'Bulldoze','C',0),(16,'Close Combat','C',0),(17,'Cross Chop','C',0),(18,'Cross Poison','C',0),(19,'Crunch','C',0),(20,'Dark Pulse','C',0),(21,'Dazzling Gleam','C',0),(22,'Dig','C',0),(23,'Disarming Voice','C',0),(24,'Discharge','C',0),(25,'Dragon Claw','C',0),(26,'Dragon Pulse','C',0),(27,'Draining Kiss','C',0),(28,'Drill Peck','C',0),(29,'Drill Run','C',0),(30,'Dynamic Punch','C',0),(31,'Earthquake','C',0),(32,'Energy Ball','C',0),(33,'Fire Blast','C',0),(34,'Fire Punch','C',0),(35,'Flame Burst','C',0),(36,'Flame Charge','C',0),(37,'Flame Wheel','C',0),(38,'Flamethrower','C',0),(39,'Flash Cannon','C',0),(40,'Focus Blast','C',0),(41,'Foul Play','C',0),(42,'Future Sight','C',0),(43,'Grass Knot','C',0),(44,'Gunk Shot','C',0),(45,'Gyro Ball','C',0),(46,'Heat Wave','C',0),(47,'Heavy Slam','C',0),(48,'Horn Attack','C',0),(49,'Hurricane','C',0),(50,'Hydro Pump','C',0),(51,'Hyper Beam','C',0),(52,'Hyper Fang','C',0),(53,'Ice Beam','C',0),(54,'Ice Punch','C',0),(55,'Icy Wind','C',0),(56,'Iron Head','C',0),(57,'Leaf Blade','C',0),(58,'Low Sweep','C',0),(59,'Magnet Bomb','C',0),(60,'Megahorn','C',0),(61,'Mirror Coat','C',0),(62,'Moonblast','C',0),(63,'Mud Bomb','C',0),(64,'Night Shade','C',0),(65,'Night Slash','C',0),(66,'Ominous Wind','C',0),(67,'Outrage','C',0),(68,'Overheat','C',0),(69,'Petal Blizzard','C',0),(70,'Play Rough','C',0),(71,'Poison Fang','C',0),(72,'Power Gem','C',0),(73,'Power Whip','C',0),(74,'Psybeam','C',0),(75,'Psychic','C',0),(76,'Psyshock','C',0),(77,'Rock Blast','C',0),(78,'Rock Slide','C',0),(79,'Rock Tomb','C',0),(80,'Sand Tomb','C',0),(81,'Seed Bomb','C',0),(82,'Shadow Ball','C',0),(83,'Shadow Punch','C',0),(84,'Shadow Sneak','C',0),(85,'Signal beam','C',0),(86,'Silver Wind','C',0),(87,'Sky Attack','C',0),(88,'Sludge','C',0),(89,'Sludge Bomb','C',0),(90,'Sludge Wave','C',0),(91,'Solar Beam','C',0),(92,'Stomp','C',0),(93,'Stone Edge','C',0),(94,'Struggle','C',0),(95,'Submission','C',0),(96,'Swift','C',0),(97,'Thunder','C',0),(98,'Thunder Punch','C',0),(99,'Thunderbolt','C',0),(100,'Twister','C',0),(101,'Vice Grip','C',0),(102,'Water Pulse','C',0),(103,'Wild Charge','C',0),(104,'Wrap','C',0),(105,'X Scissor','C',0),(106,'Zap Cannon','C',0),(107,'Acid','Q',0),(108,'Air Slash','Q',0),(109,'Astonish','Q',0),(110,'Bite','Q',0),(111,'Bubble','Q',0),(112,'Bug Bite','Q',0),(113,'Bullet Punch','Q',0),(114,'Bullet Seed','Q',0),(115,'Charge Beam','Q',0),(116,'Confusion','Q',0),(117,'Counter','Q',0),(118,'Cut','Q',0),(119,'Dragon Breath','Q',0),(120,'Dragon Tail','Q',0),(121,'Ember','Q',0),(122,'Extrasensory','Q',0),(123,'Feint Attack','Q',0),(124,'Fire Fang','Q',0),(125,'Fire Spin','Q',0),(126,'Frost Breath','Q',0),(127,'Fury Cutter','Q',0),(128,'Hex','Q',0),(129,'Hidden Power','Q',0),(130,'Ice Shard','Q',0),(131,'Infestation','Q',0),(132,'Iron Tail','Q',0),(133,'Karate Chop','Q',0),(134,'Lick','Q',0),(135,'Low Kick','Q',0),(136,'Metal Claw','Q',0),(137,'Mud Shot','Q',0),(138,'Mud Slap','Q',0),(139,'Peck','Q',0),(140,'Poison Jab','Q',0),(141,'Poison Sting','Q',0),(142,'Pound','Q',0),(143,'Powder Snow','Q',0),(144,'Psycho Cut','Q',0),(145,'Quick Attack','Q',0),(146,'Razor Leaf','Q',0),(147,'Rock Smash','Q',0),(148,'Rock Throw','Q',0),(149,'Scratch','Q',0),(150,'Shadow Claw','Q',0),(151,'Snarl','Q',0),(152,'Spark','Q',0),(153,'Splash','Q',0),(154,'Steel Wing','Q',0),(155,'Struggle Bug','Q',0),(156,'Sucker Punch','Q',0),(157,'Tackle','Q',0),(158,'Thunder Shock','Q',0),(159,'Transform','Q',0),(160,'Vine Whip','Q',0),(161,'Volt Switch','Q',0),(162,'Water Gun','Q',0),(163,'Wing Attack','Q',0),(164,'Zen Headbutt','Q',0);
/*!40000 ALTER TABLE `moves` ENABLE KEYS */;
UNLOCK TABLES;

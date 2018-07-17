USE prof_oak;


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
-- Table structure for table `eggs`
--

DROP TABLE IF EXISTS `eggs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `eggs` (
  `dex_id` int(11) DEFAULT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distance` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rareity` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shiny` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eggs`
--

LOCK TABLES `eggs` WRITE;
/*!40000 ALTER TABLE `eggs` DISABLE KEYS */;
INSERT INTO `eggs` VALUES (142,'Aerodactyl','10','ULTRA-RARE',0),(113,'Chansey','10','RARE',0),(147,'Dratini','10','UNCOMMON',0),(131,'Lapras','10','ULTRA-RARE',0),(246,'Larvitar','10','UNCOMMON',0),(179,'Mareep','10','RARE',0),(241,'Miltank','10','ULTRA-RARE',0),(137,'Porygon','10','ULTRA-RARE',0),(227,'Skarmory','10','ULTRA-RARE',0),(143,'Snorlax','10','ULTRA-RARE',0),(185,'Sudowoodo','10','RARE',0),(152,'Chikorita','5','UNCOMMON',0),(104,'Cubone','5','COMMON',0),(155,'Cyndaquil','5','UNCOMMON',0),(170,'Chinchou','5','COMMON',0),(96,'Drowzee','5','COMMON',0),(206,'Dunsparce','5','HYPER-RARE',0),(133,'Eevee','5','COMMON',0),(239,'Elekid','5','UNCOMMON',0),(203,'Girafarig','5','HYPER-RARE',0),(207,'Gligar','5','UNCOMMON',0),(88,'Grimer','5','ULTRA-RARE',0),(58,'Growlithe','5','COMMON',0),(187,'Hoppip','5','UNCOMMON',0),(140,'Kabuto','5','ULTRA-RARE',0),(109,'Koffing','5','ULTRA-RARE',0),(108,'Lickitung','5','ULTRA-RARE',0),(240,'Magby','5','UNCOMMON',0),(226,'Mantine','5','UNCOMMON',0),(183,'Marill','5','UNCOMMON',0),(228,'Houndour','5','UNCOMMON',0),(177,'Natu','5','UNCOMMON',0),(138,'Omanyte','5','ULTRA-RARE',0),(95,'Onix','5','RARE',0),(231,'Phanpy','5','COMMON',0),(204,'Pineco','5','UNCOMMON',0),(127,'Pinsir','5','RARE',0),(60,'Poliwag','5','COMMON',0),(77,'Ponyta','5','COMMON',0),(211,'Qwilfish','5','ULTRA-RARE',0),(111,'Rhyhorn','5','COMMON',0),(123,'Scyther','5','COMMON',0),(86,'Seel','5','RARE',0),(90,'Shellder','5','COMMON',0),(213,'Shuckle','5','HYPER-RARE',0),(238,'Smoochum','5','UNCOMMON',0),(215,'Sneasel','5','ULTRA-RARE',0),(209,'Snubbull','5','UNCOMMON',0),(234,'Stantler','5','UNCOMMON',0),(220,'Swinub','5','UNCOMMON',0),(114,'Tangela','5','RARE',0),(216,'Teddiursa','5','UNCOMMON',0),(158,'Totodile','5','UNCOMMON',0),(236,'Tyrogue','5','UNCOMMON',0),(100,'Voltorb','5','COMMON',0),(202,'Wobbuffet','5','HYPER-RARE',0),(194,'Wooper','5','UNCOMMON',0),(63,'Abra','2','UNCOMMON',0),(190,'Aipom','2','UNCOMMON',0),(173,'Cleffa','2','UNCOMMON',0),(50,'Diglett','2','UNCOMMON',0),(102,'Exeggcute','2','UNCOMMON',0),(92,'Gastly','2','UNCOMMON',0),(74,'Geodude','2','COMMON',0),(174,'Igglybuff','2','UNCOMMON',0),(98,'Krabby','2','COMMON',0),(66,'Machop','2','UNCOMMON',0),(200,'Misdreavus','2','ULTRA-RARE',0),(32,'Nidoran(M)','2','COMMON',0),(29,'Nidoran(F)','2','COMMON',0),(43,'Oddish','2','UNCOMMON',0),(172,'Pichu','2','UNCOMMON',1),(79,'Slowpoke','2','UNCOMMON',0),(218,'Slugma','2','UNCOMMON',0),(167,'Spinarak','2','COMMON',0),(175,'Togepi','2','UNCOMMON',0),(129,'Magikarp','2','UNCOMMON',1),(302,'Sableye','10','N/A',1);
/*!40000 ALTER TABLE `eggs` ENABLE KEYS */;
UNLOCK TABLES;

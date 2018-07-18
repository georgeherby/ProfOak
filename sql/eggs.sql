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
  `dex_id` int(3) DEFAULT NULL,
  `name` varchar(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distance` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shiny` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eggs`
--

LOCK TABLES `eggs` WRITE;
/*!40000 ALTER TABLE `eggs` DISABLE KEYS */;
INSERT INTO `eggs` VALUES
	(113,'Chansey','10',0),
	(137,'Porygon','10',0),
	(143,'Snorlax','10',0),
	(147,'Dratini','10',1),
	(179,'Mareep','10',1),
	(246,'Larvitar','10',1),
	(287,'Slakoth','10',0),
	(328,'Trapinch','10',0),
	(349,'Feebas','10',0),
	(358,'Chimecho','10',0),
	(371,'Bagon','10',0),
	(374,'Beldum','10',0),
	(52,'Alolan Meowth','7',0),
	(19,'Alolan Rattata','7',0),
	(27,'Alolan Sandshrew','7',0),
	(88,'Alolan Grimer','7',0),
	(37,'Alolan Vulpix','7',0),
	(95,'Onix','5',0),
	(108,'Lickitung','5',0),
	(114,'Tangela','5',0),
	(123,'Scyther','5',0),
	(133,'Eevee','5',0),
	(138,'Omanyte','5',1),
	(140,'Kabuto','5',1),
	(203,'Girafarig','5',0),
	(204,'Pineco','5',0),
	(213,'Shuckle','5',0),
	(226,'Mantine','5',0),
	(236,'Tyrogue','5',0),
	(238,'Smoochum','5',0),
	(239,'Elekid','5',0),
	(240,'Magby','5',1),
	(252,'Treecko','5',0),
	(255,'Torchic','5',0),
	(258,'Mudkip','5',0),
	(270,'Lotad','5',0),
	(278,'Wingull','5',0),
	(285,'Shroomish','5',0),
	(296,'Makuhita','5',1),
	(298,'Azurill','5',0),
	(299,'Nosepass','5',0),
	(318,'Carvanha','5',0),
	(322,'Numel','5',0),
	(331,'Cacnea','5',0),
	(341,'Corphish','5',0),
	(343,'Baltoy','5',0),
	(345,'Lileep','5',0),
	(360,'Wynaut','5',1),
	(361,'Snorunt','5',1),
	(66,'Machop','2',0),
	(91,'Shellder','2',1),
	(172,'Pichu','2',1),
	(173,'Cleffa','2',0),
	(174,'Igglybuff','2',0),
	(175,'Togepi','2',1),
	(220,'Swinub','2',0),
	(261,'Poochyena','2',1),
	(276,'Taillow','2',0),
	(304,'Aron','2',1),
	(320,'Wailmer','2',1),
	(333,'Swablu','2',1),
	(339,'Barboach','2',0),
	(363,'Spheal','2',0),
	(370,'Luvdisc','2',1);
/*!40000 ALTER TABLE `eggs` ENABLE KEYS */;
UNLOCK TABLES;

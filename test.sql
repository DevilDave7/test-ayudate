-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: base
-- ------------------------------------------------------
-- Server version	8.0.16

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
-- Table structure for table `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `perfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) NOT NULL,
  `descripcion` text,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `usuario_id_creacion` int(11) DEFAULT NULL,
  `usuario_id_actualizacion` int(11) DEFAULT NULL,
  `estatus` int(11) NOT NULL COMMENT '1=activo\n0=inactivo',
  PRIMARY KEY (`id`),
  KEY `perfiles_creacion_usuario_ic_fk_idx` (`usuario_id_creacion`),
  KEY `perfiles_usuario_id_actualizacion_fk_idx` (`usuario_id_actualizacion`),
  CONSTRAINT `perfiles_usuario_id_actualizacion_fk` FOREIGN KEY (`usuario_id_actualizacion`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `perfiles_usuario_id_creacion_fk` FOREIGN KEY (`usuario_id_creacion`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
INSERT INTO `perfiles` VALUES (1,'prueba de perfiles','nuevo','2019-07-30 13:49:28','2019-09-10 12:05:24',NULL,NULL,0),(2,'prueba','','2019-07-30 13:49:43','2019-09-10 14:11:38',NULL,NULL,1),(3,'segunda prueba','xxxx','2019-07-30 13:49:45','2019-09-10 14:11:15',NULL,NULL,1),(4,'prueba','','2019-07-30 13:49:46','2019-07-30 13:52:00',NULL,NULL,0),(5,'nuevo nomas','asd','2019-09-10 10:35:35','2019-09-10 10:37:43',NULL,NULL,0),(6,'nueva prueba','','2019-09-10 12:31:04','2019-09-10 14:10:36',NULL,NULL,1);
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `correo` varchar(128) DEFAULT NULL,
  `telefono` varchar(14) DEFAULT NULL,
  `estatus` int(11) NOT NULL COMMENT '1=activo\\n0=inactivo',
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `usuario_id_creacion` int(11) DEFAULT NULL,
  `usuario_id_actualizacion` int(11) DEFAULT NULL,
  `token` text,
  `token_expiracion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarios_perfil_id_fk_idx` (`perfil_id`),
  CONSTRAINT `usuarios_perfil_id_fk` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'prueba1','123',3,'pruebas1@gmail.com','123456',0,'2019-07-30 17:29:55','2019-09-10 09:02:37',NULL,NULL,NULL,NULL),(2,'prueba2','0',3,'pruebas2@gmail.com','123456',1,'2019-07-30 17:31:33',NULL,NULL,NULL,NULL,NULL),(3,'prueba3','0',3,'pruebas3@gmail.com','123456',1,'2019-07-30 17:32:21',NULL,NULL,NULL,NULL,NULL),(4,'prueba4','9fe6bba1d7114ff36c3fa8b1f873e47a15378917c91ae7c7a2aa961da22c88798828f88126344ff3b204e162c9e102164ff8c47a9308659cfc4491434199cf8b',3,'pruebas4@gmail.com','123456',1,'2019-07-30 17:33:27',NULL,NULL,NULL,NULL,NULL),(5,'prueba5','bfe003fe66890193174b3aaaa47ff5320f18c6524ce6ba3da4b07efda3eb0c6571f471784bd6a95456d12a71c19b029ed17331b438b7fa576a5521104d7c49cb',3,'pruebas5@gmail.com','123456',1,'2019-07-30 17:50:17',NULL,NULL,NULL,NULL,NULL),(6,'prueba6','1c6d5af8ede71470430e4986532d1539afb19da96d425869c09101ef82d0e1beb1349086a7de6ec3d7b14055219bd705144578f125643ab06f83d629821eae15',3,'pruebas6@gmail.com','123456',1,'2019-07-30 17:53:26',NULL,NULL,NULL,NULL,NULL),(8,'jorge','8f32af73457d589e6b1e87bd57df38d79ece4468ad628ee5753d962fcb3d64443150c9aef85bbc486a3ba6d02d725880fd3ae92609ba105984745804cb571f2bSUdGG3eHRwoZnm+0QACnBxhu5O2LO/PkKw6KEnPXZAM=',1,'jorge@gmail.com','0000000000',1,'2019-08-05 15:55:52',NULL,NULL,NULL,'34ce3889afa017848a727bba83e5306813d9515419a13f80a4d54c75bdb05722a68d7f9aed030bc753318e39839bf614598336673651baeb3dcb805acc24588epr4uE7euncBH85HQCh6v0IyruqUHMQVNc24yWYTnLdqgR4Y7kPcHeJGiJZS+kUOZ','2019-10-16 22:42:13'),(9,'prueba7','98066a4331d915716f5ff6a7de677ea50dd826782d873848ac75a2a3ab8cb8b3ed2d2bb2054bf3eb6bd5003943acb0b6ebba895bb6f34e246384db4a9b81165bQ6GJmgT8mkI1n54jTXxpzTxkwzByeDmPbbcsiIshBT4=',2,'prueba7@gmai.com','(98) 4651 6516',0,'2019-09-09 17:37:15','2019-09-10 09:00:24',NULL,NULL,NULL,NULL),(10,'prueba8123','586020d1972029777aa2fff11d551a2046a1dc63e17ce6ccc58920c3d24c0e95b213fb855313bd292a88110162b5f899040f306f4624d4f4090025b219748502Hn3PUWnnJ+ie2q3d5WeCbjDSPTM3O2fxjR9twKMLSwY=',1,'prueba8@gmail.com','(16) 6165 1651',0,'2019-09-09 17:42:31','2019-09-10 09:00:06',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'base'
--

--
-- Dumping routines for database 'base'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-24  9:33:25

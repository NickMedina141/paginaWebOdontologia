-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: clinicadental
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `pacientes_cedula` int(11) DEFAULT NULL,
  `odontologos_cedula` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `servicio` varchar(100) DEFAULT NULL,
  `id_horario` int(11) NOT NULL,
  PRIMARY KEY (`id_cita`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (11,1234567890,1322445566,'2025-06-05','14:00:00','15:00:00',0,'sacada de muelas',3),(13,1234567890,1322445566,'2025-06-04','09:00:00','10:00:00',1,'sacada de muelas',13),(14,1234567890,1322445566,'2025-06-04','13:00:00','14:00:00',1,'radiografia 3d',10);
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `paciente_cedula` int(11) DEFAULT NULL,
  `padecimientos` varchar(255) DEFAULT NULL,
  `tratamientos` varchar(255) DEFAULT NULL,
  `medicamentos` varchar(255) DEFAULT NULL,
  `alergias` varchar(255) DEFAULT NULL,
  `antecedentes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_historial`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
INSERT INTO `historial` VALUES (1,1234567890,'Bruxismo','limpieza dental','ibuprofeno 500 mg','penicilina','Hipertension'),(2,1003674922,'Bruxismo','blanqueamiento','Amoxicilina 500mg','latex','diabetes'),(3,1066885489,'sensibilidad dental','ortodoncia','amoxicilina 500mg','latex','diabetes'),(4,987654321,'sensibilidad dental','ortodoncia','ibuprofeno 400 mg','ninguna','latex'),(5,1111111111,'Sensibilidad dental, Bruxismo','limpieza dental','ibuprofeno 600 mg','ninguna','diabetes');
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horarios` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `dia_semana` varchar(20) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (3,'3','08:00:00','09:00:00',0,'2025-06-04'),(4,'4','07:00:00','08:00:00',0,'2025-06-05'),(6,'3','10:00:00','11:00:00',0,'2025-06-04'),(7,'3','11:00:00','12:00:00',1,'2025-06-04'),(9,'3','00:00:00','00:00:00',1,'0000-00-00'),(10,'3','13:00:00','14:00:00',0,'2025-06-04'),(11,'6','08:00:00','09:00:00',0,'2025-06-07'),(12,'3','14:00:00','15:00:00',0,'2025-06-04'),(13,'3','09:00:00','10:00:00',0,'2025-06-04');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odontologos`
--

DROP TABLE IF EXISTS `odontologos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `odontologos` (
  `cedula` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odontologos`
--

LOCK TABLES `odontologos` WRITE;
/*!40000 ALTER TABLE `odontologos` DISABLE KEYS */;
INSERT INTO `odontologos` VALUES (1234567890,'nicolas','bohorquez','3106866612',1,'0'),(1322445566,'Nohelia','Ortiz','9999999999',2,'1');
/*!40000 ALTER TABLE `odontologos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pacientes` (
  `cedula` int(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `sexo` tinyint(1) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `edad` datetime NOT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (987654321,'gabriel','chavez',1,'3214321321',NULL,'2000-06-23 13:59:00'),(1003674922,'karla','martinez',0,'3188875337',NULL,'2002-12-12 04:11:00'),(1066885489,'danny','hernandez',1,'3215175552',NULL,'2004-09-12 00:48:00'),(1111111111,'ilder','alberto',1,'8888888888',NULL,'1996-04-12 10:29:00'),(1234567890,'nicolas','bohorquez',0,'1234567890',NULL,'2002-03-30 00:00:00'),(2147483647,'lucenith','medina',0,'3215185522',NULL,'1980-04-02 10:43:00');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedimientos`
--

DROP TABLE IF EXISTS `procedimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `procedimientos` (
  `id_procedimiento` int(11) NOT NULL AUTO_INCREMENT,
  `pacientes_cedula` int(10) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `id_cita` int(11) NOT NULL,
  PRIMARY KEY (`id_procedimiento`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedimientos`
--

LOCK TABLES `procedimientos` WRITE;
/*!40000 ALTER TABLE `procedimientos` DISABLE KEYS */;
INSERT INTO `procedimientos` VALUES (7,1234567890,'tomar ibufrofeno de 400mg por 2 dias',13),(13,1234567890,'no beber mucha agua fria',13);
/*!40000 ALTER TABLE `procedimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reportes` (
  `id_reporte` int(11) NOT NULL AUTO_INCREMENT,
  `mes_reporte` varchar(20) DEFAULT NULL,
  `fecha_creacion` date DEFAULT curdate(),
  PRIMARY KEY (`id_reporte`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
INSERT INTO `reportes` VALUES (1,'junio','2025-06-04'),(2,'noviembre','2025-05-31'),(3,'diciembre','2025-05-31'),(6,'febrero','2025-05-31');
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `id_servicios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `costo` double NOT NULL,
  PRIMARY KEY (`id_servicios`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'limpieza Dental','eliminación profesional de placa y sarro para mantener sus dientes y encías saludables.',60000),(7,'sacada de muelas','procedimiento de extracción de muelas en mal estado ',10000),(8,'radiografia 3d','radiografia en 3d para revision de la dentadura y mandibula',100000);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` tinyint(1) NOT NULL,
  `cedula` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'nbohorquezm@unicesar.edu.co','$2y$10$UkuunKSqGKmnKsv3qagP/.GYmsC9iqi2JdijvGegS8KMiHPyBBzwC',0,1234567890),(2,'km12122002r@gmail.com','$2y$10$L.72ArBzfvv4Y8nX5PGskOHhbuOX12uDxMJMIIwsmKbJJFis5hzNG',1,1003674922),(3,'dannyHernandez@gmail.com','$2y$10$.9JmODBGXYBJs4sE14BD5OscBEq0tx0Rf1Ne1S.9AFQV4sjylbliG',2,1066885489),(4,'gchavez.1235@gmail.com','$2y$10$Q3D9I65Vh2ZC.pI7Oo0HF.H1uQjCdS6BumEyRGJjYvQwJDfG7mT4C',2,987654321),(5,'ilderAlbertoGutierrez@gmail.com','$2y$10$d49IrmI09lnEX/i9Pfdaye76dy3as9QSyZdb2qEh5otAi5eDFJj4e',2,1111111111),(6,'lucham@gmail.com','$2y$10$Dufhb7pWOqVdEmV1l/VtpeFSLx9Dwb7BhIA.yDWdrUYe5rtLYPte.',2,2147483647);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-02 11:19:11

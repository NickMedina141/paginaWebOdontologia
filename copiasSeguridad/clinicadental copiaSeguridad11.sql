-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2025 a las 00:57:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clinicadental`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `pacientes_cedula` int(11) DEFAULT NULL,
  `odontologos_cedula` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `servicio` varchar(100) DEFAULT NULL,
  `id_horario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `pacientes_cedula`, `odontologos_cedula`, `fecha`, `hora_inicio`, `hora_fin`, `estado`, `servicio`, `id_horario`) VALUES
(11, 1234567890, 1322445566, '2025-06-04', '00:00:10', '00:00:00', 0, 'limpieza Dental', 0),
(13, 1234567890, 1322445566, '2025-06-04', '00:00:08', '00:00:01', 1, 'sacada de muelas', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL,
  `paciente_cedula` int(11) DEFAULT NULL,
  `padecimientos` varchar(255) DEFAULT NULL,
  `tratamientos` varchar(255) DEFAULT NULL,
  `medicamentos` varchar(255) DEFAULT NULL,
  `alergias` varchar(255) DEFAULT NULL,
  `antecedentes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id_historial`, `paciente_cedula`, `padecimientos`, `tratamientos`, `medicamentos`, `alergias`, `antecedentes`) VALUES
(1, 1234567890, 'Bruxismo', 'limpieza dental', 'ibuprofeno 500 mg', 'penicilina', 'Hipertension'),
(2, 1003674922, 'Bruxismo', 'blanqueamiento', 'Amoxicilina 500mg', 'latex', 'diabetes'),
(3, 1066885489, 'sensibilidad dental', 'ortodoncia', 'amoxicilina 500mg', 'latex', 'diabetes'),
(4, 987654321, 'sensibilidad dental', 'ortodoncia', 'ibuprofeno 400 mg', 'ninguna', 'latex'),
(5, 1111111111, 'Sensibilidad dental, Bruxismo', 'limpieza dental', 'ibuprofeno 600 mg', 'ninguna', 'diabetes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int(11) NOT NULL,
  `dia_semana` varchar(20) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id_horario`, `dia_semana`, `hora_inicio`, `hora_fin`, `estado`, `fecha`) VALUES
(3, '3', '08:00:00', '09:00:00', 0, '2025-06-04'),
(4, '4', '07:00:00', '08:00:00', 0, '2025-06-05'),
(6, '3', '10:00:00', '11:00:00', 0, '2025-06-04'),
(7, '3', '11:00:00', '12:00:00', 1, '2025-06-04'),
(9, '3', '00:00:00', '00:00:00', 1, '0000-00-00'),
(10, '3', '13:00:00', '14:00:00', 0, '2025-06-04'),
(11, 'sabado', '08:00:00', '09:00:00', 0, '2025-06-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `odontologos`
--

CREATE TABLE `odontologos` (
  `cedula` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `odontologos`
--

INSERT INTO `odontologos` (`cedula`, `nombre`, `apellido`, `telefono`, `id_usuario`, `rol`) VALUES
(1065867688, 'nicolas', 'bohorquez', '3106866612', 1, 'administrador'),
(1322445566, 'Nohelia', 'Ortiz', '9999999999', 2, 'odontologo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `cedula` int(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `sexo` tinyint(1) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `edad` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`cedula`, `nombres`, `apellidos`, `sexo`, `telefono`, `id_usuario`, `edad`) VALUES
(987654321, 'gabriel', 'chavez', 1, '3214321321', NULL, '2000-06-23 13:59:00'),
(1003674922, 'karla', 'martinez', 0, '3188875337', NULL, '2002-12-12 04:11:00'),
(1066885489, 'danny', 'hernandez', 1, '3215175552', NULL, '2004-09-12 00:48:00'),
(1111111111, 'ilder', 'alberto', 1, '8888888888', NULL, '1996-04-12 10:29:00'),
(1234567890, 'nicolas', 'bohorquez', 1, '1234567811', NULL, '2002-03-30 00:00:00'),
(2147483647, 'lucenith', 'medina', 0, '3215185522', NULL, '1980-04-02 10:43:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procedimientos`
--

CREATE TABLE `procedimientos` (
  `id_procedimiento` int(11) NOT NULL,
  `pacientes_cedula` int(10) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `id_cita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procedimientos`
--

INSERT INTO `procedimientos` (`id_procedimiento`, `pacientes_cedula`, `descripcion`, `id_cita`) VALUES
(7, 1234567890, 'tomar ibufrofeno de 400mg por 2 dias', 13),
(13, 1234567890, 'no beber mucha agua fria', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id_reporte` int(11) NOT NULL,
  `mes_reporte` varchar(20) DEFAULT NULL,
  `fecha_creacion` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id_reporte`, `mes_reporte`, `fecha_creacion`) VALUES
(1, 'junio', '2025-06-04'),
(2, 'noviembre', '2025-05-31'),
(3, 'diciembre', '2025-05-31'),
(6, 'febrero', '2025-05-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicios` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `costo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicios`, `nombre`, `descripcion`, `costo`) VALUES
(1, 'limpieza Dental', 'eliminación profesional de placa y sarro para mantener sus dientes y encías saludables.', 60000),
(7, 'sacada de muelas', 'procedimiento de extracción de muelas en mal estado ', 10000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `cedula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `correo`, `contraseña`, `rol`, `cedula`) VALUES
(1, 'nbohorquezm@unicesar.edu.co', '$2y$10$UkuunKSqGKmnKsv3qagP/.GYmsC9iqi2JdijvGegS8KMiHPyBBzwC', 'Paciente', 1234567890),
(2, 'km12122002r@gmail.com', '$2y$10$L.72ArBzfvv4Y8nX5PGskOHhbuOX12uDxMJMIIwsmKbJJFis5hzNG', 'paciente', 1003674922),
(3, 'dannyHernandez@gmail.com', '$2y$10$.9JmODBGXYBJs4sE14BD5OscBEq0tx0Rf1Ne1S.9AFQV4sjylbliG', 'Paciente', 1066885489),
(4, 'gchavez.1235@gmail.com', '$2y$10$Q3D9I65Vh2ZC.pI7Oo0HF.H1uQjCdS6BumEyRGJjYvQwJDfG7mT4C', 'Paciente', 987654321),
(5, 'ilderAlbertoGutierrez@gmail.com', '$2y$10$d49IrmI09lnEX/i9Pfdaye76dy3as9QSyZdb2qEh5otAi5eDFJj4e', 'paciente', 1111111111),
(6, 'lucham@gmail.com', '$2y$10$Dufhb7pWOqVdEmV1l/VtpeFSLx9Dwb7BhIA.yDWdrUYe5rtLYPte.', 'paciente', 2147483647);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_historial`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`);

--
-- Indices de la tabla `odontologos`
--
ALTER TABLE `odontologos`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `procedimientos`
--
ALTER TABLE `procedimientos`
  ADD PRIMARY KEY (`id_procedimiento`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id_reporte`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicios`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `procedimientos`
--
ALTER TABLE `procedimientos`
  MODIFY `id_procedimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id_reporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

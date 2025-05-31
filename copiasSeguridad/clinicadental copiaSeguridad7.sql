-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2025 a las 02:27:03
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
(5, 123456, 96754, '2025-06-03', '08:00:00', '09:00:00', 1, 'limpieza Dental', 3);

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
(1, 123456, 'Bruxismo', 'limpieza dental', 'ibuprofeno 600 mg', 'penicilina', 'Hipertension'),
(2, 1003674922, 'Bruxismo', 'blanqueamiento', 'Amoxicilina 500mg', 'latex', 'diabetes'),
(3, 1066885489, 'sensibilidad dental', 'ortodoncia', 'amoxicilina 500mg', 'latex', 'diabetes');

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
(3, 'miercoles', '08:00:00', '10:00:00', 0, '2025-06-04'),
(4, 'jueves', '00:00:00', '00:00:00', 1, '2025-06-05'),
(6, 'miercoles', '10:00:00', '11:00:00', 0, '2025-06-04'),
(7, 'viernes', '00:00:00', '00:00:00', 1, '2025-06-06');

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
(123456, 'nicolas', 'bohorquez', 1, '1234567811', NULL, '2002-03-30 00:00:00'),
(9876541, 'gabriel', 'chavez', 1, '3214321321', NULL, '2000-06-23 13:59:00'),
(1003674922, 'karla', 'martinez', 0, '3188875337', NULL, '2002-12-12 04:11:00'),
(1066885489, 'danny', 'hernandez', 1, '3215175552', NULL, '2004-09-12 00:48:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procedimientos`
--

CREATE TABLE `procedimientos` (
  `id_procedimiento` int(11) NOT NULL,
  `pacientes_cedula` int(10) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'nbohorquezm@unicesar.edu.co', '$2y$10$UkuunKSqGKmnKsv3qagP/.GYmsC9iqi2JdijvGegS8KMiHPyBBzwC', 'Paciente', 123456),
(2, 'km12122002r@gmail.com', '$2y$10$L.72ArBzfvv4Y8nX5PGskOHhbuOX12uDxMJMIIwsmKbJJFis5hzNG', 'paciente', 1003674922),
(3, 'dannyHernandez@gmail.com', '$2y$10$.9JmODBGXYBJs4sE14BD5OscBEq0tx0Rf1Ne1S.9AFQV4sjylbliG', 'Paciente', 1066885489),
(4, 'gchavez.1235@gmail.com', '$2y$10$Q3D9I65Vh2ZC.pI7Oo0HF.H1uQjCdS6BumEyRGJjYvQwJDfG7mT4C', 'Paciente', 9876541);

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
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `procedimientos`
--
ALTER TABLE `procedimientos`
  MODIFY `id_procedimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

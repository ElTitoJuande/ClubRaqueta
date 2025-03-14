-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2025 a las 09:54:21
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `club_de_tenins`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id_clase` int(11) NOT NULL,
  `id_instalacion` int(11) DEFAULT NULL,
  `fecha_clase` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones_clases`
--

CREATE TABLE `inscripciones_clases` (
  `id_inscripcion` int(11) NOT NULL,
  `id_clase` int(11) DEFAULT NULL,
  `id_socio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instalaciones`
--

CREATE TABLE `instalaciones` (
  `id_instalacion` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `instalaciones`
--

INSERT INTO `instalaciones` (`id_instalacion`, `nombre`) VALUES
(1, 'Pista tenis 1'),
(2, 'Pista tenis 2'),
(3, 'Pista tenis 3'),
(4, 'Pista pádel 1'),
(5, 'Pista pádel 2'),
(6, 'Pista multideporte'),
(7, 'Pista squash'),
(8, 'Restaurante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_espera`
--

CREATE TABLE `lista_espera` (
  `id_lista` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_solicitud` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_socio` int(11) DEFAULT NULL,
  `id_instalacion` int(11) DEFAULT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `id_socio` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_ingreso` date NOT NULL,
  `estado` enum('activo','pendiente venta') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `socios`
--

INSERT INTO `socios` (`id_socio`, `id_usuario`, `fecha_ingreso`, `estado`) VALUES
(2, 2, '2025-03-04', 'activo'),
(3, 4, '2025-03-05', 'activo'),
(4, 6, '2025-03-05', 'activo'),
(5, 5, '2025-03-05', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('socio','administrador','visitante') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `password`, `rol`) VALUES
(1, 'admin', 'admin@admin.com', '123456', 'administrador'),
(2, 'Juande', 'juande@gmail.com', '123456', 'socio'),
(3, 'Maria', 'maria@gmail.com', '123456', 'visitante'),
(4, 'Pedro', 'pedro@gmail.com', '123456', 'socio'),
(5, 'Juan', 'juan@gmail.com', '123456', 'socio'),
(6, 'Angel', 'angel@gmail.com', '123456', 'socio');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id_clase`),
  ADD KEY `id_instalacion` (`id_instalacion`);

--
-- Indices de la tabla `inscripciones_clases`
--
ALTER TABLE `inscripciones_clases`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD KEY `id_clase` (`id_clase`),
  ADD KEY `id_socio` (`id_socio`);

--
-- Indices de la tabla `instalaciones`
--
ALTER TABLE `instalaciones`
  ADD PRIMARY KEY (`id_instalacion`);

--
-- Indices de la tabla `lista_espera`
--
ALTER TABLE `lista_espera`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_socio` (`id_socio`),
  ADD KEY `id_instalacion` (`id_instalacion`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`id_socio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id_clase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones_clases`
--
ALTER TABLE `inscripciones_clases`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `instalaciones`
--
ALTER TABLE `instalaciones`
  MODIFY `id_instalacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `lista_espera`
--
ALTER TABLE `lista_espera`
  MODIFY `id_lista` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `id_socio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`);

--
-- Filtros para la tabla `inscripciones_clases`
--
ALTER TABLE `inscripciones_clases`
  ADD CONSTRAINT `inscripciones_clases_ibfk_1` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id_clase`),
  ADD CONSTRAINT `inscripciones_clases_ibfk_2` FOREIGN KEY (`id_socio`) REFERENCES `socios` (`id_socio`);

--
-- Filtros para la tabla `lista_espera`
--
ALTER TABLE `lista_espera`
  ADD CONSTRAINT `lista_espera_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_socio`) REFERENCES `socios` (`id_socio`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`);

--
-- Filtros para la tabla `socios`
--
ALTER TABLE `socios`
  ADD CONSTRAINT `socios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

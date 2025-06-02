-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2025 a las 14:32:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `club_raqueta_rute`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `descripcion_completa` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `fecha_fin` date NOT NULL,
  `hora_fin` time NOT NULL,
  `imagen` varchar(255) DEFAULT '/src/assets/images/eventos-default.jpg',
  `plazas` int(11) NOT NULL DEFAULT 0,
  `tipo_evento` varchar(50) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `estado` enum('activo','cancelado','finalizado') NOT NULL DEFAULT 'activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `descripcion`, `descripcion_completa`, `fecha_inicio`, `hora_inicio`, `fecha_fin`, `hora_fin`, `imagen`, `plazas`, `tipo_evento`, `ubicacion`, `estado`, `fecha_creacion`) VALUES
(25, 'Torneo Primavera', 'Torneo por equipos en categorías júnior y adulto', 'Participa en nuestro prestigioso Torneo de Primavera. Competición por equipos en categorías júnior y adulto. Premios para los finalistas y ganadores. Inscripción abierta hasta el 1 de junio.', '2025-06-15', '09:00:00', '2025-06-16', '18:00:00', '/src/assets/images/torneos.jpg', 32, 'torneo', 'Pistas centrales', 'activo', '2025-05-30 11:30:05'),
(26, 'Clase Magistral de Tenis', 'Clase especial con entrenador profesional', 'Aprende de los mejores en esta clase magistral impartida por profesionales del circuito. Mejora tu técnica, estrategia y condición física. Plazas limitadas.', '2025-06-20', '17:00:00', '2025-06-20', '19:30:00', '/src/assets/images/clases.jpg', 15, 'clinica', 'Pista 1', 'activo', '2025-05-30 11:30:05'),
(27, 'Gala Benéfica Anual', 'Cena y subasta benéfica para recaudar fondos', 'Únete a nuestra gala anual donde disfrutarás de una cena de gala y participarás en una subasta benéfica. Todos los fondos recaudados se destinarán a programas deportivos para jóvenes en situación vulnerable.', '2025-07-10', '20:00:00', '2025-07-10', '23:30:00', '/src/assets/images/gala.jpg', 100, 'gala', 'Salón principal', 'activo', '2025-05-30 11:30:05'),
(28, 'Velada de Pádel Nocturno', 'Torneo amistoso de pádel con iluminación especial', 'Disfruta de una noche mágica de pádel bajo las estrellas. Torneo informal con formato americano, refrigerios incluidos y ambiente inmejorable.', '2025-06-25', '21:00:00', '2025-06-26', '01:00:00', '/src/assets/images/padel-nocturno.jpg', 24, 'torneo', 'Pistas de pádel 1-4', 'activo', '2025-05-30 11:30:05'),
(29, 'Torneo de Verano Sub-18', 'Competencia juvenil de alto nivel', 'Este torneo reúne a los mejores talentos juveniles en una competición vibrante. Ideal para descubrir futuras estrellas del tenis.', '2025-07-05', '10:00:00', '2025-07-06', '18:00:00', '/src/assets/images/torneo-jovenes.jpg', 28, 'torneo', 'Pistas 3 y 4', 'activo', '2025-05-30 11:31:40'),
(30, 'Entrenamiento Funcional en Grupo', 'Sesión de entrenamiento físico general', 'Participa en este entrenamiento grupal enfocado en mejorar fuerza, resistencia y movilidad, adecuado para todos los niveles.', '2025-06-18', '08:00:00', '2025-06-18', '09:00:00', '/src/assets/images/funcional.jpg', 20, 'clinica', 'Zona fitness', 'activo', '2025-05-30 11:31:40'),
(31, 'Torneo Express de Pádel', 'Torneo de una mañana con premios', 'Torneo de pádel rápido en formato de eliminación directa. Ideal para socios que buscan competencia en poco tiempo.', '2025-06-29', '09:00:00', '2025-06-29', '13:00:00', '/src/assets/images/padel-express.jpg', 16, 'torneo', 'Pistas de pádel', 'activo', '2025-05-30 11:31:40'),
(32, 'Fiesta de Verano del Club', 'Celebración con música y comida', 'Ven a disfrutar de una jornada festiva con música en vivo, barra libre de tapas, actividades para niños y mucho más.', '2025-07-13', '17:00:00', '2025-07-13', '23:00:00', '/src/assets/images/fiesta-verano.jpg', 150, 'gala', 'Jardines del club', 'activo', '2025-05-30 11:31:40'),
(33, 'Seminario de Nutrición Deportiva', 'Charla educativa sobre alimentación saludable', 'Aprende los fundamentos de una nutrición óptima para deportistas con una nutricionista experta invitada.', '2025-06-22', '19:00:00', '2025-06-22', '20:30:00', '/src/assets/images/nutricion.jpg', 40, 'clinica', 'Sala multiusos', 'activo', '2025-05-30 11:31:40'),
(34, 'Cine al Aire Libre', 'Proyección nocturna de película familiar', 'Disfruta de una noche de cine bajo las estrellas en familia. Se proyectará una película sorpresa. Palomitas gratis.', '2025-07-01', '21:30:00', '2025-07-01', '23:45:00', '/src/assets/images/cine-verano.jpg', 100, 'gala', 'Zona verde trasera', 'activo', '2025-05-30 11:31:40'),
(35, 'Clínica de Saque y Resto', 'Mejora tu técnica en situaciones clave', 'Entrena tu saque y tu respuesta con ejercicios intensivos y supervisión personalizada por entrenadores certificados.', '2025-06-27', '18:00:00', '2025-06-27', '20:00:00', '/src/assets/images/clinica-saque.jpg', 12, 'clinica', 'Pista 2', 'activo', '2025-05-30 11:31:40'),
(36, 'Masterclass de Pádel con Pro', 'Sesión avanzada con jugador profesional invitado', 'Clínica avanzada de pádel con análisis técnico, drills tácticos y ronda de preguntas con un jugador top del circuito.', '2025-07-08', '16:00:00', '2025-07-08', '18:30:00', '/src/assets/images/masterclass-padel.jpg', 10, 'clinica', 'Pista Pádel VIP', 'activo', '2025-05-30 11:31:40'),
(37, 'Exhibición de Tenis Infantil', 'Partidos amistosos de alumnos menores', 'Los niños del programa de formación mostrarán lo aprendido en una jornada familiar llena de sonrisas y premios.', '2025-06-30', '10:30:00', '2025-06-30', '12:00:00', '/src/assets/images/infantil.jpg', 50, 'gala', 'Pistas 5 y 6', 'activo', '2025-05-30 11:31:40'),
(38, 'Jornada de Puertas Abiertas', 'Día gratuito para no socios', 'Abierto a todo el público. Conoce nuestras instalaciones, prueba las actividades y participa en sorteos especiales.', '2025-07-06', '09:00:00', '2025-07-06', '14:00:00', '/src/assets/images/puertas-abiertas.jpg', 200, 'gala', 'Todo el club', 'activo', '2025-05-30 11:31:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones_eventos`
--

CREATE TABLE `inscripciones_eventos` (
  `id` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_inscripcion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','confirmada','cancelada') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instalaciones`
--

CREATE TABLE `instalaciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `activa` tinyint(1) DEFAULT 1,
  `hora_apertura` time NOT NULL DEFAULT '09:00:00',
  `hora_cierre` time NOT NULL DEFAULT '22:00:00',
  `duracion_reserva` int(11) NOT NULL DEFAULT 60,
  `capacidad` int(11) NOT NULL DEFAULT 4,
  `requiere_socio` tinyint(1) NOT NULL DEFAULT 1,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `instalaciones`
--

INSERT INTO `instalaciones` (`id`, `nombre`, `tipo`, `descripcion`, `activa`, `hora_apertura`, `hora_cierre`, `duracion_reserva`, `capacidad`, `requiere_socio`, `imagen`) VALUES
(1, 'Pista de Tenis', 'tenis', 'Exterior con iluminación', 1, '09:00:00', '22:00:00', 60, 4, 1, NULL),
(2, 'Pista de Pádel', 'pádel', 'Cubierta interior', 1, '09:00:00', '22:00:00', 60, 4, 1, NULL),
(3, 'Piscina', 'piscina', 'Piscina abierta todo el año', 1, '10:00:00', '20:00:00', 120, 50, 1, NULL),
(4, 'Gimnasio', 'gimnasio', 'Equipado con máquinas y pesas', 1, '07:00:00', '22:00:00', 90, 20, 1, NULL),
(5, 'Pista Multideporte', 'multideporte', 'Realiza cualquier actividad física', 1, '09:00:00', '22:00:00', 60, 10, 1, NULL),
(6, 'Pista Squash', 'squash', 'Con suelo deportivo elástico', 1, '09:00:00', '22:00:00', 60, 2, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `instalacion_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `usuario_id`, `instalacion_id`, `fecha`, `hora_inicio`, `hora_fin`, `fecha_creacion`) VALUES
(27, 2, 3, '2025-05-28', '13:00:00', '14:00:00', '2025-05-28 01:39:13'),
(28, 2, 2, '2025-05-29', '15:00:00', '16:00:00', '2025-05-28 01:39:52'),
(29, 2, 2, '2025-05-30', '14:00:00', '15:00:00', '2025-05-28 01:39:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`) VALUES
(1, 'ADMIN', 'Administrador del sistema'),
(2, 'SOCIO', 'Socio con acceso completo a instalaciones'),
(3, 'INVITADO', 'Usuario visitante con acceso restringido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol_id` int(11) NOT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `telefono`, `rol_id`, `fecha_registro`) VALUES
(1, 'Admin', 'admin@clubraqueta.com', 'admin123', '666777888', 1, '2025-05-21 14:36:48'),
(2, 'Juande Pérez', 'juande@email.com', 'socio123', '666111222', 2, '2025-05-21 14:36:48'),
(3, 'Invitado', 'invitado@clubraqueta.com', 'invitado123', '666333444', 3, '2025-05-21 14:36:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inscripciones_eventos`
--
ALTER TABLE `inscripciones_eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `instalaciones`
--
ALTER TABLE `instalaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `instalacion_id` (`instalacion_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `inscripciones_eventos`
--
ALTER TABLE `inscripciones_eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `instalaciones`
--
ALTER TABLE `instalaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripciones_eventos`
--
ALTER TABLE `inscripciones_eventos`
  ADD CONSTRAINT `inscripciones_eventos_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_eventos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`instalacion_id`) REFERENCES `instalaciones` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

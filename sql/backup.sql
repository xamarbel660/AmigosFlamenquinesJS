-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 29-10-2025 a las 11:29:59
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `amigosFlamenquines`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `board`
--

CREATE TABLE `board` (
  `idBoard` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `capacity` int NOT NULL,
  `isReserved` tinyint(1) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cashOrder`
--

CREATE TABLE `cashOrder` (
  `idCashOrder` int NOT NULL,
  `cashOrderDate` datetime NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `isCompleted` tinyint(1) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `idClient` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `idClient` int NOT NULL,
  `dateCreatedAccount` date NOT NULL,
  `age` int NOT NULL,
  `isVip` tinyint(1) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderDish`
--

CREATE TABLE `orderDish` (
  `idCashOrder` int NOT NULL,
  `idPlate` int NOT NULL,
  `quantity` int NOT NULL,
  `notes` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plate`
--

CREATE TABLE `plate` (
  `idPlate` int NOT NULL,
  `addedDate` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservation`
--

CREATE TABLE `reservation` (
  `idReservation` int NOT NULL,
  `reservationDate` datetime NOT NULL,
  `numberOfGuests` int NOT NULL,
  `isNightReservation` tinyint(1) NOT NULL,
  `comment` varchar(50) NOT NULL,
  `idBoard` int NOT NULL,
  `idClient` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`idBoard`);

--
-- Indices de la tabla `cashOrder`
--
ALTER TABLE `cashOrder`
  ADD PRIMARY KEY (`idCashOrder`),
  ADD KEY `FK_CashOrder_Client` (`idClient`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`idClient`);

--
-- Indices de la tabla `orderDish`
--
ALTER TABLE `orderDish`
  ADD PRIMARY KEY (`idCashOrder`,`idPlate`),
  ADD KEY `FK_OrderDish_Plate` (`idPlate`);

--
-- Indices de la tabla `plate`
--
ALTER TABLE `plate`
  ADD PRIMARY KEY (`idPlate`);

--
-- Indices de la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`idReservation`),
  ADD KEY `FK_Reser_Board` (`idBoard`),
  ADD KEY `FK_Reser_Client` (`idClient`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `board`
--
ALTER TABLE `board`
  MODIFY `idBoard` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cashOrder`
--
ALTER TABLE `cashOrder`
  MODIFY `idCashOrder` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `idClient` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plate`
--
ALTER TABLE `plate`
  MODIFY `idPlate` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservation`
--
ALTER TABLE `reservation`
  MODIFY `idReservation` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cashOrder`
--
ALTER TABLE `cashOrder`
  ADD CONSTRAINT `FK_CashOrder_Client` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orderDish`
--
ALTER TABLE `orderDish`
  ADD CONSTRAINT `FK_OrderDish_CashOrder` FOREIGN KEY (`idCashOrder`) REFERENCES `cashOrder` (`idCashOrder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_OrderDish_Plate` FOREIGN KEY (`idPlate`) REFERENCES `plate` (`idPlate`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_Reser_Board` FOREIGN KEY (`idBoard`) REFERENCES `board` (`idBoard`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Reser_Client` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

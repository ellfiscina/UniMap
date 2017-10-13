-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 13-Out-2017 às 14:42
-- Versão do servidor: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unimap_teste`
--
CREATE DATABASE IF NOT EXISTS `unimap_teste` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `unimap_teste`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `authorizations`
--

CREATE TABLE `authorizations` (
  `user` varchar(11) NOT NULL,
  `room` int(11) NOT NULL,
  `teacher` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `authorizations`
--

INSERT INTO `authorizations` (`user`, `room`, `teacher`) VALUES
('08799757419', 1, '08799757419');

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplines`
--

CREATE TABLE `disciplines` (
  `cod_disc` varchar(8) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `disciplines`
--

INSERT INTO `disciplines` (`cod_disc`, `name`, `department`) VALUES
('CCMP0046', 'Engenharia de Software', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `notifications`
--

CREATE TABLE `notifications` (
  `cod` int(11) NOT NULL,
  `room` int(11) NOT NULL,
  `user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `reservations`
--

CREATE TABLE `reservations` (
  `user` varchar(11) NOT NULL,
  `room` int(11) NOT NULL,
  `teacher` varchar(11) NOT NULL,
  `discipline` varchar(8) NOT NULL,
  `initialTime` int(11) NOT NULL,
  `finalTime` int(11) NOT NULL,
  `weekDay` varchar(9) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `reservations`
--

INSERT INTO `reservations` (`user`, `room`, `teacher`, `discipline`, `initialTime`, `finalTime`, `weekDay`, `date`) VALUES
('08799757419', 1, '08799757419', 'CCMP0046', 10, 12, '', '2017-10-11'),
('', 1, '08799757419', 'CCMP0046', 10, 12, '', '2017-10-12'),
('08799757419', 1, '08799757419', '1', 14, 16, '', '2017-10-01'),
('', 1, '08799757419', 'CCMP0046', 16, 18, 'Monday', '0000-00-00'),
('', 1, '08799757419', 'CCMP0046', 16, 18, 'Tuesday', '0000-00-00'),
('', 2, '08799757419', 'CCMP0046', 10, 12, 'Friday', '0000-00-00'),
('', 2, '08799757419', 'CCMP0046', 10, 12, 'Monday', '0000-00-00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `rooms`
--

CREATE TABLE `rooms` (
  `cod_sala` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `rooms`
--

INSERT INTO `rooms` (`cod_sala`, `name`, `status`) VALUES
(1, 'Sala 1', 'D'),
(2, 'Sala 2', ''),
(3, 'Sala 3', ''),
(4, 'Sala 4', ''),
(5, 'Sala 5', ''),
(6, 'Sala 6', ''),
(7, 'Sala 7', ''),
(8, 'Sala 8', ''),
(9, 'Sala 9', ''),
(10, 'Sala 10', ''),
(11, 'Sala 11', ''),
(12, 'Sala 12', ''),
(13, 'Sala 13', ''),
(14, 'Sala 14', ''),
(15, 'Sala 15', ''),
(16, 'Sala 16', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` char(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `cpf`, `name`, `email`, `password`, `type`) VALUES
(0, '08799757419', 'Joao Pedro', 'joaopedrofn@gmail.com', 'e8d95a51f3af4a3b134bf6bb680a213a', 'G');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authorizations`
--
ALTER TABLE `authorizations`
  ADD PRIMARY KEY (`user`,`room`,`teacher`),
  ADD KEY `room` (`room`);

--
-- Indexes for table `disciplines`
--
ALTER TABLE `disciplines`
  ADD PRIMARY KEY (`cod_disc`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `room` (`room`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`room`,`teacher`,`initialTime`,`weekDay`,`date`),
  ADD KEY `room` (`room`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`cod_sala`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`cpf`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `cod_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `authorizations`
--
ALTER TABLE `authorizations`
  ADD CONSTRAINT `authorizations_ibfk_1` FOREIGN KEY (`room`) REFERENCES `rooms` (`cod_sala`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `room` FOREIGN KEY (`room`) REFERENCES `rooms` (`cod_sala`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`room`) REFERENCES `rooms` (`cod_sala`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

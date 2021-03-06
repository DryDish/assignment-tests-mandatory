-- DB creation script 1/3

-- Preparation
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- DB initialization
CREATE DATABASE IF NOT EXISTS `addresses` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
use `addresses`;

-- Table creation
DROP TABLE IF EXISTS `postal_code`;

CREATE TABLE IF NOT EXISTS `postal_code` (
    `cPostalCode` char(4) NOT NULL,
    `cTownName` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`cPostalCode`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- -------------------------------------------------------------
-- TablePlus 6.6.8(632)
--
-- https://tableplus.com/
--
-- Database: Hackthon-bitnob
-- Generation Time: 2025-07-23 20:05:47.8440
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `M_id` bigint NOT NULL AUTO_INCREMENT,
  `M_name` varchar(50) NOT NULL,
  `M_password` varchar(50) NOT NULL,
  `M_type` varchar(10) NOT NULL,
  `M_last_login` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ourlock` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`M_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pname` varchar(50) NOT NULL,
  `user_namel` varchar(50) NOT NULL,
  `timedofa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2641 DEFAULT CHARSET=utf8mb3;

INSERT INTO `members` (`M_id`, `M_name`, `M_password`, `M_type`, `M_last_login`, `ourlock`) VALUES
(1, 'admin', 'admin', 'user', '2025-07-23 18:52:19', 0),
(2, 'alidahab', '8188ALI$', 'vender', '2025-07-23 18:52:19', 0),
(3, 'samir', 'samir', 'vender', '2025-07-23 18:52:19', 0),
(4, 'samir@yahoo.com', 'samir', 'vendor', '2025-07-23 19:04:04', 0),
(5, 'samir@yahoo.com', 'samir', 'vendor', '2025-07-23 19:04:27', 0),
(6, 'test@test.com', 'asdasdasd', 'user', '2025-07-23 19:04:43', 0),
(7, 'test@test.com', 'asdasdasd', 'user', '2025-07-23 19:06:09', 0);

INSERT INTO `products` (`id`, `pname`, `user_namel`, `timedofa`, `price`) VALUES
(2638, 'asd', 'Guest', '2025-07-23 20:04:55', 'asd'),
(2639, 'item1', 'Guest', '2025-07-23 20:05:08', '200'),
(2640, '', 'Guest', '2025-07-23 20:05:08', '');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
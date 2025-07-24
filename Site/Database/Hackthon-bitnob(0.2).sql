-- -------------------------------------------------------------
-- TablePlus 6.6.8(632)
--
-- https://tableplus.com/
--
-- Database: Hackthon-bitnob
-- Generation Time: 2025-07-24 20:12:34.8400
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
  `lightingaddress` text,
  `btcaddress` text,
  PRIMARY KEY (`M_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pname` varchar(50) NOT NULL,
  `user_namel` varchar(50) NOT NULL,
  `timedofa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2647 DEFAULT CHARSET=utf8mb3;

INSERT INTO `members` (`M_id`, `M_name`, `M_password`, `M_type`, `M_last_login`, `lightingaddress`, `btcaddress`) VALUES
(38, 'testuser@test.com', 'testuser', 'user', '2025-07-24 19:56:51', 'lnbt1-mocked-9ff30405e1859c5d1684cf9f5546bca2518629494a27b4b335010db214b741d741b3429362680d0c2d1028beb9e65c7732f52a480d329ac6f7ba9108a98447dd4fc30ebcf2b4qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqd15b4a694483b4aecb33af0aa490fe31a2cef63a01d58643a3f2305b6f0943ba607a00693a4bcf6698fc0714e9e13aa7094af37ce19b4e463261f4346738c88b83bb3b0314d2', NULL),
(39, 'testvendor@test.com', 'testvendor', 'vendor', '2025-07-24 19:56:51', 'lnbt1-mocked-9ff30405e1859c5d1684cf9f5546bca2518629494a27b4b335010db214b741d741b3429362680d0c2d1028beb9e65c7732f52a480d329ac6f7ba9108a98447dd4fc30ebcf2b4qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqd15b4a694483b4aecb33af0aa490fe31a2cef63a01d58643a3f2305b6f0943ba607a00693a4bcf6698fc0714e9e13aa7094af37ce19b4e463261f4346738c88b83bb3b0314d2', NULL),
(53, 'sam@sam.com', 'sam@sam.com', 'vendor', '2025-07-24 19:59:56', 'lnbt1-mocked-9ff30405e1859c5d1684cf9f5546bca2518629494a27b4b335010db214b741d741b3429362680d0c2d1028beb9e65c7732f52a480d329ac6f7ba9108a98447dd4fc30ebcf2b4qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqd15b4a694483b4aecb33af0aa490fe31a2cef63a01d58643a3f2305b6f0943ba607a00693a4bcf6698fc0714e9e13aa7094af37ce19b4e463261f4346738c88b83bb3b0314d2', 'tb1q4a9lphnslkj658ysza9ujxa8vp2pkjtr2dhqgm');

INSERT INTO `products` (`id`, `pname`, `user_namel`, `timedofa`, `price`) VALUES
(2641, 'item1', 'testvendor@test.com', '2025-07-24 11:59:16', '200'),
(2642, 'item2', 'testvendor@test.com', '2025-07-24 11:59:21', '250'),
(2643, 'item3', 'testvendor@test.com', '2025-07-24 11:59:28', '1500'),
(2645, 'tometo', 'groupvendor@test.com', '2025-07-24 13:46:36', '5'),
(2646, 'phone x', 'sam@sam.com', '2025-07-24 18:52:06', '1500');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
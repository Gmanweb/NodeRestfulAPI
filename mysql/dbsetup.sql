-- Dumping database structure for NodeRestFulAPIDB
CREATE DATABASE IF NOT EXISTS `NodeRestFulAPIDB`;
USE `NodeRestFulAPIDB`;

-- Dumping structure for table NodeRestFulAPIDB.users
CREATE TABLE `users` (
`uid` int(11) AUTO_INCREMENT,
`username` varchar(50),
`password` varchar(200),
`email` varchar(200),
PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping structure for table NodeRestFulAPIDB.messages
CREATE TABLE `messages` (
`mid` int(11) AUTO_INCREMENT,
`message` text,
`uid_fk` int(11),
PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table NodeRestFulAPIDB.users: ~2 rows (approximately)
INSERT INTO `users` (`uid`, `username`, `password`, `email`) VALUES
(1, 'gman', 'password', 'gm@n.ie'),
(2, 'web', 'password', 'web@n.ie');

-- Dumping data for table NodeRestFulAPIDB.messages: ~4 rows (approximately)
INSERT INTO `messages` (`mid`, `message`, `uid_fk`) VALUES
(1, 'User is making a request', 1),
(2, 'Check out the Restful service here', 1),
(3, 'This REST is the real deal', 1),
(4, 'Call me, we do lunch after this REST', 2);

-- select statement, test the data.
-- SELECT * FROM NodeRestFulAPIDB.messages where uid_fk like 1;

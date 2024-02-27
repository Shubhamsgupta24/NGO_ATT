create database NGO_MNGT

CREATE TABLE `ngo_mngt`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO `ngo_mngt`.`user` (`id`, `full_name`, `email`, `password`) VALUES ('1', 'vedant dudhale', 'vedantdudhale@gmail.com', '12345');
INSERT INTO `ngo_mngt`.`user` (`id`, `full_name`, `email`, `password`) VALUES ('2', 'krishna', 'krishna@gmail.com', '12345');


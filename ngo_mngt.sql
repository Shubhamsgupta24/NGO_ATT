create database NGO_MNGT

CREATE TABLE `ngo_mngt`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO `ngo_mngt`.`user` (`id`, `full_name`, `email`, `password`) VALUES ('1', 'vedant dudhale', 'vedantdudhale@gmail.com', '12345');
INSERT INTO `ngo_mngt`.`user` (`id`, `full_name`, `email`, `password`) VALUES ('2', 'krishna', 'krishna@gmail.com', '12345');
INSERT INTO `ngo_mngt`.`user` (`id`, `full_name`, `email`, `password`) VALUES ('3', 'shubham', 'shubham@gmail.com', '12345');

CREATE TABLE `ngo_mngt`.`student` (
  `stud_id` INT NOT NULL AUTO_INCREMENT,
  `student_name` VARCHAR(255) NOT NULL, -- You need to specify the data type and length for the column
  `class` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `school` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`stud_id`)
);

DROP TABLE IF EXISTS `ngo_mngt`.`schools`;
  
CREATE TABLE `ngo_mngt`.`schools` (
  `schools_id` INT NOT NULL AUTO_INCREMENT,
  `school_name` VARCHAR(45) NOT NULL,
  `boys` INT NOT NULL,
  `girls` INT NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`schools_id`));

INSERT INTO `ngo_mngt`.`student` (`stud_id`, `student_name`, `class`, `type`, `school`, `gender`) VALUES
(1, 'राहुल जोशी', '1', 'आश्रमिक', 'अमोणी', 'Male'),
(2, 'सोनाली पवार', '2', 'विनासवळत', 'राणीपूर', 'Female'),
(3, 'प्रज्ञा गायकवाड', '3', 'आश्रमिक', 'बोरद', 'Female'),
(4, 'महेश ठोरात', '4', 'विनासवळत', 'जांभारइ', 'Male'),
(5, 'अनुप्रिया मोहने', '5', 'आश्रमिक', 'इच्छागव्हाण', 'Female'),
(6, 'अर्जुन पाटील', '6', 'विनासवळत', 'भांगरापाणी', 'Male'),
(7, 'अंबिका पाटील', '7', 'आश्रमिक', 'नाला', 'Female'),
(8, 'सुभाष जाधव', '8', 'विनासवळत', 'कुंभारखान', 'Male'),
(9, 'सुनीता वाघ', '9', 'आश्रमिक', 'अलिविहीर', 'Female'),
(10, 'प्रियंका पुजारी', '10', 'विनासवळत', 'बर्डी', 'Female'),
(11, 'अश्विनी जाधव', '11', 'आश्रमिक', 'भगदरी', 'Male'),
(12, 'राजेश पाटील', '12', 'विनासवळत', 'दाब', 'Male'),
(13, 'स्वप्निल गव्हाणे', '1', 'आश्रमिक', 'तालंबा', 'Male'),
(14, 'दीपाली सोनारे', '2', 'विनासवळत', 'मोरंबा', 'Female'),
(15, 'सुनिता पवार', '3', 'आश्रमिक', 'होराफळी', 'Female'),
(16, 'अरुण सापकार', '4', 'विनासवळत', 'वडफळी', 'Male'),
(17, 'प्रदीप मांडवी', '5', 'आश्रमिक', 'सरी', 'Male'),
(18, 'अर्चना खडके', '6', 'विनासवळत', 'खडकापाणी', 'Female'),
(19, 'प्रिया जोशी', '7', 'आश्रमिक', 'कंकाळामाळ', 'Female'),
(20, 'राहुल दहेलकर', '8', 'विनासवळत', 'जांगठी', 'Male'),
(21, 'मृणाल गमणे', '9', 'आश्रमिक', 'गमण', 'Female'),
(22, 'सुधीर तोरणकर', '10', 'विनासवळत', 'दहेल', 'Male'),
(23, 'मेघा खोपकर', '11', 'आश्रमिक', 'तोरणमाळ', 'Female'),
(24, 'संजय चुलवडे', '12', 'विनासवळत', 'चुलवड', 'Male');

INSERT INTO ngo_mngt.schools (school_name, boys, girls, total)
VALUES
('शिर्वे', 29, 0, 29),
('लोभाणी', 37, 0, 37),
('सलसाडी', 32, 2, 34),
('अमोणी', 35, 4, 39),
('राणीपूर', 39, 7, 57),
('बोरद', 36, 4, 40),
('जांभारइ', 34, 5, 66),
('इच्छागव्हाण', 40, 5, 72),
('भांगरापाणी', 31, 4, 52),
('नाला', 37, 3, 40),
('कुंभारखान', 40, 0, 40),
('अलिविहीर', 38, 4, 42),
('बर्डी', 37, 3, 40),
('भगदरी', 37, 0, 37),
('दाब', 40, 0, 40),
('तालंबा', 38, 5, 43),
('मोरंबा', 37, 1, 38),
('होराफळी', 39, 1, 40),
('वडफळी', 37, 3, 40),
('सरी', 34, 5, 39),
('खडकापाणी', 40, 0, 40),
('कंकाळामाळ', 40, 1, 41),
('जांगठी', 40, 1, 41),
('गमण', 39, 1, 40),
('दहेल', 40, 0, 40),
('तोरणमाळ', 38, 0, 38),
('चुलवड', 38, 0, 38),
('मांडवी', 40, 0, 40),
('हातधुई', 39, 0, 39),
('काकरदा', 39, 0, 39),
('रोषमाळ', 39, 0, 39),
('असली', 39, 0, 39),
('बिजरी', 38, 0, 38),
('तलारइ', 38, 0, 38),
('मोजरा', 38, 0, 38),
('सोन खुर्द', 38, 0, 38),
('झापी', 37, 0, 37),
('सिंदीदिगर', 37, 0, 37),
('शेलगदा', 37, 0, 37),
('वलवाल', 37, 0, 37),
('त्रिशूल', 37, 0, 37),
('तेलखेडी', 37, 0, 37);



  
  

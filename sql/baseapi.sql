CREATE TABLE `baseapi`.`user`(  
  `userId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`userId`)
);

CREATE TABLE `baseapi`.`user_group`(  
  `userGroupId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`userGroupId`)
);

ALTER TABLE `baseapi`.`user`   
  ADD COLUMN `userGroupId` INT(11) NULL AFTER `name`,
  ADD CONSTRAINT `rf_user_userGroup` FOREIGN KEY (`userGroupId`) REFERENCES `baseapi`.`user_group`(`userGroupId`);

ALTER TABLE `baseapi`.`user`   
  ADD COLUMN `userGroupId` INT(11) NULL AFTER `name`,
  ADD CONSTRAINT `rf_user_userGroup` FOREIGN KEY (`userGroupId`) REFERENCES `baseapi`.`user_group`(`userGroupId`);

INSERT INTO `baseapi`.`user_group` (`userGroupId`, `name`) VALUES ('1', 'Administradores');

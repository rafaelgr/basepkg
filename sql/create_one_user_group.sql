# Assures the record doesn't exist
DELETE FROM user_group WHERE userGroupId = 2;
# Inserts a user group
INSERT INTO user_group (`userGroupId`, `name`) VALUES ('2', 'TestGroup'); 

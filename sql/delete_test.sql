# clean up old test records tidily
DELETE FROM user WHERE name LIKE '%Test%';
DELETE FROM user_group WHERE name LIKE '%Test%';
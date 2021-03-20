mysql -u root --password=root < sql.sql


mysqldump -u root --password=root covid | mysql -u root --password=root covid_backup


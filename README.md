
## Connecting To The Databases

In order to connect to the two databses used in this repo, developers must add two .env files on their local system. One should be `.env.devlopment` and the other `.env.test` for the development and test databses respectively. Inside these two files the databses must be specified so the databases can be connected to, e.g. `PGDATABASE=database_name` for the development database and `PGDATABASE=database_name_test` for the test database. 

## Project Summary

The project is an API that hosts reviews on boardgames. Each review has a section for comments and a rating system. Reviews can be retrieved via their ID. Comments can also be retrieved based on their comment ID. The API also allows deletion of comments from the system and is able to return all users who have commented on the system. 

## Cloning This Repository

Select an area 

## Connecting To The Databases

In order to connect to the two databses used in this repo, developers must add two .env files on their local system. One should be `.env.devlopment` and the other `.env.test` for the development and test databses respectively. Inside these two files the databses must be specified so the databases can be connected to, e.g. `PGDATABASE=nc_games` for the development database and `PGDATABASE=nc_games_test` for the test database. 

## Link to hosted version

https://nc-games-service.onrender.com/


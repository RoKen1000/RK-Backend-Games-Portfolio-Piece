
## Project Summary

The project is an API that hosts reviews on boardgames. Each review has a section for comments and a rating system. Reviews can be retrieved via their ID. Comments can also be retrieved based on their comment ID. The API also allows deletion of comments from the system and is able to return all users who have commented on the system. 

## Cloning This Repository

Select an area you want this repository to be cloned to on your local machine. Then navigate to this place in the termal and type the following:
> git clone https://github.com/RoKen1000/RK-Backend-Games-Portfolio-Piece.git

The repository will then download to your machine.

## Dependencies

This project uses dotenv, express and node-postgres (abbrevated to "pg") as dependencies. The developer dependencies required to run the test suite are husky, jest, jest-extended, jest-sorted, pg-format and supertest. To install these dependencies, type the following in the terminal in VS Code:
> npm install

The package.json contained in this repository will then automatically install all required packages.

## Minimum node.js and postgres versions required
The minimum required version of node that is required is v19.7.0 and for postgres version 14.7. Previous versions may still work with the project but can not be guaranteed. 

## Seeding the database
The databases can be seeded via a convenient script. Type the following in the terminal:
> npm run seed

The run-seed file will then start and seed the local databases. 

## Running tests
To run the test suite type the following:
> npm test app.test.js

This will then run the test suite displaying which tests pass or not. This command can also be used with the utils.test.js file to run the tests on the utility functions used when the databases are seeded. 

## Connecting To The Databases

In order to connect to the two databses used in this repo, developers must add two .env files on their local system. One should be `.env.devlopment` and the other `.env.test` for the development and test databses respectively. Inside these two files the databases must be specified so the databases can be connected to, e.g. `PGDATABASE=nc_games` for the development database and `PGDATABASE=nc_games_test` for the test database. These files are required for the databases to run locally on your machine. Create these files at the top level of this repository.

## Link to hosted version

<a href="https://nc-games-service.onrender.com/api">The hosted version of this project can be found here.</a>

Please note that the hosting service may be slow to load. 
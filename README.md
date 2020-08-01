<h1 align="center">
  <img src="https://res.cloudinary.com/dhqnvbd52/image/upload/v1594130509/GoBarber/logo_l1zdif.svg" alt="GoBarber" width="500" />
</h1>

## Project Status
<p align="center">🏗 in development</p> 

## Setting up Databases 

The project uses [PostgreSQL](https://www.postgresql.org/).

I recommend use [Docker](https://www.docker.com/)  to install and run the database.

## How to use

Tools that need to be installed

[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) 

In addition to an editor to be able to work with the code [VSCode](https://code.visualstudio.com/)

### 🎲 Running the application 
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16](https://nodejs.org/) or higher + [Yarn v1.13](https://yarnpkg.com/) or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/wilsonmjunior/go-barber-api

# Go into the folder and install dependencies
$ cd go-barber-api 

# Install dependencies
$ yarn

# Create the container in the Docker
docker-compose -f "docker-compose.yml" up -d --build

# Run migrations
yarn typeorm migration:run

# Run the application in development 
$ yarn dev:server

# The server will start at the port:3333 - access <http://localhost:3333>
```

## :rocket: Technologies
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [Eslint](https://eslint.org/)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
- [Prettier](https://prettier.io/)
- [Typeorm](https://typeorm.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/docker-community)

## :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/wilsonmjunior/go-barber-nodejs/blob/master/LICENSE) for more information.

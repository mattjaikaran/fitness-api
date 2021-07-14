# Fitness API 
NodeJS API built with AdonisJS 5

## Technologies
- NodeJS
- AdonisJS 5 Framework
- TypeScript
- Lucid ORM
- PostGreSQL


## Features

- Auth sessions
- Instructors can 
    - Book a Fitness Class
    - Cancel a Fitness Class
    - Hand off class to another Instructor
- Students can
    - Book a class if under capacity
    - Waitlist for classes at capacity
    - Cancel a Fitness Class
- Admin Users can 
    - CRUD functionality for 
        - Users
        - Instructors
        - Students
        - Locations
        - Boxes
        - Approve bookings for Instructors


## Installation

This API requires [Node.js](https://nodejs.org/) v14.16.0 to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/mattjaikaran/fitness-api-adonis
cd fitness-api
yarn
yarn dev
```



## Development

There are seeder files to populate the db.

Open your favorite Terminal and run these commands.

Seed DB:

```sh
node ace db:seed
```

Create a seeder:

```sh
node ace make:seeder SEED_NAME
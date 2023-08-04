<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

It is a implementation of the Task3 in RADENCY internship

[Nest](https://https://docs.google.com/document/d/1wQbWm08yyh2gRltkHlcDNOaBPyfkqHH7JvozwINtjUI/edit) Hometask #3 | NodeJS

### STACK :

_[Nest](https://github.com/nestjs/nest) Nestjs;
_[class-validator](https://www.npmjs.com/package/class-validator) class-validator for validating;
*[uuid](https://www.npmjs.com/package/uuid) uuid for random id generation;
*SWAGGER

## Installation

```bash
$ git clone https://github.com/xtadeushx/note-app-api.git
$ npm install
$ npm run start
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Running the swagger

go [](http://localhost:3000/api)

## Endpoints:

_1._ POST /notes - Create a note object./
_2._ DELETE /notes/:id - Remove item.
_3._ PATCH /notes/:id - Edit item.
_4._ GET /notes/:id - Retrieve item..
_5._ GET /notes - Get all notes..
_6._ GET /notes/stats - Get aggregated data statistics. You don’t have to mock this data. You need to calculate it based on notes objects you have..

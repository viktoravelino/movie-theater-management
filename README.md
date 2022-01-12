# Overview

This application is to simulate a management system for a movie theatre. Within the system, you can create new movie sessions, delete them, and other functionalities focused on a movie theatre.

# Application

- Clone the repository

## Backend server

- Open the backend project on an IDE (IntelliJ / Eclipse)
- Inside the application.properties, set the database's username and password if needed.
- Inside the application.properties, set a server port if 8080 is already in use.
- run the main file (PopcornApplication.java) inside the IDE or compile the project.
- API should be visible on http://localhost:8080 or the port set
- To test it, browse to http://localhost:8080/hello

## Frontend server

- Open the frontend project
- Install the dependencies `yarn` or `npm install`
- Run the development environment `yarn start` or `npm run start`
- You can access by http://localhost:5000 on your browser

**Both servers should be running**

<br>
<br>

# API DOCS

## Authenticate User (use "username:"foo", password:"12345")

`POST: /api/auth/authenticate`<br>
body content:

```json
{
  "username": "foo",
  "password": "12345"
}
```

- Success Response:

  - code: 200<br>
    content

  ```json
  {
    "jwt": "jwtstring"
  }
  ```

- Error Response:

  - code: 403 FORBIDDEN

    <br>

## Manage Movies

### Save a new movie

`POST: /api/movies`<br>
body content:

```json
{
  "coverURL": "http://example.com/image.jpg",
  "title": "Fast and Furious 9",
  "description": "The speed saga.",
  "duration": 180
}
```

- Success Response

  - code: 200<br>
    content:

  ```json
  {
    "id": 1,
    "coverURL": "http://example.com/image.jpg",
    "title": "Fast and Furious 9",
    "description": "The speed saga.",
    "duration": 180
  }
  ```

- Error Response:

  - code: 409 CONFLICT

  ```json
  {
    "timestamp": "2021-11-15T17:11:47.307+00:00",
    "status": 409,
    "error": "Conflict",
    "trace": "",
    "message": "The movie title already exists.",
    "path": "/api/movies"
  }
  ```

### Change an existing movie

`PUT: /api/movies`<br>
body content:

```json
{
  "id": 5,
  "coverURL": "http://example.com/image.jpg",
  "title": "Fast and Furious 10",
  "description": "The speed saga.",
  "duration": 180
}
```

- Success Response

  - code: 200<br>
    content:

  ```json
  {
    "id": 5,
    "coverURL": "http://example.com/image.jpg",
    "title": "Fast and Furious 10",
    "description": "The speed saga.",
    "duration": 180
  }
  ```

- Error Response:

  - code: 409 CONFLICT

  ```json
  {
    "timestamp": "2021-11-15T17:11:47.307+00:00",
    "status": 409,
    "error": "Conflict",
    "trace": "",
    "message": "The movie title already exists.",
    "path": "/api/movies"
  }
  ```

### Get a list of all movies

`GET: /api/movies`

- Success Response

  - code: 200<br>
    content:

  ```json
  [
    {
      "id": 3,
      "coverURL": "http://example.com/image.jpg",
      "title": "Capitan America",
      "description": "Marvel movie",
      "duration": 250
    },
    {
      "id": 5,
      "coverURL": "http://example.com/image.jpg",
      "title": "Fast and Furious 10",
      "description": "The speed saga.",
      "duration": 180
    }
  ]
  ```

### Get a movie by its id

`GET: /api/movies/MOVIE_ID`

- Success Response

  - code: 200<br>
    content:

  ```json
  {
    "id": 5,
    "coverURL": "http://example.com/image.jpg",
    "title": "Fast and Furious 10",
    "description": "The speed saga.",
    "duration": 180
  }
  ```

### Delete a movie by its id

`DELETE: /api/movies/MOVIE_ID`

- Success Response

  - code: 200

- Error Response

  - code: 404 NOT FOUND

## Rooms

### Get a list of all rooms

`GET: /api/rooms`

- Success Response

  - code: 200<br>
    content:

  ```json
  [
    {
      "id": 1,
      "name": "Sala 1",
      "numberOfSeats": 30
    },
    {
      "id": 2,
      "name": "Sala 2",
      "numberOfSeats": 50
    }
  ]
  ```

### Get rooms available by date, start time, start end

`GET: /api/rooms?date=2021-12-24&startTime=1000&endTime=1100`<br>
_Date Format: yyyy-mm-dd<br>_
_Time in 24hrs format<br>_
_11:00 = 1100<br>_
_14:00 = 1400_

- Success Response

  - code: 200<br>
    content:

  ```json
  [
    {
      "id": 1,
      "name": "Sala 1",
      "numberOfSeats": 30
    },
    {
      "id": 2,
      "name": "Sala 2",
      "numberOfSeats": 50
    }
  ]
  ```


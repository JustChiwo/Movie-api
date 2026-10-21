# Movie-api
Mini Backend Project: Movie Watchlist API 

## Technologies Used

- Node.js
- Express.js
- Nodemon (development only, restarts the server when files change)
- Postman (API testing)

## Project Structure

```
movie-api/
├── controllers/
│   └── movieController.js
├── routes/
│   └── movieRoutes.js
├── screenshots/
├── app.js
├── package.json
└── package-lock.json
```

- **routes/movieRoutes.js** connects each HTTP method and URL to a controller function.
- **controllers/movieController.js** holds the movie data and the logic for each CRUD operation.
- **app.js** creates the server and mounts the routes.

## Installation

1. Clone the repository:

```
git clone https://github.com/JustChiwo/Movie-api.git
```

2. Go into the project folder:

```
cd Movie-api
```

3. Install the dependencies:

```
npm install
```

## Starting the Server

npm run dev


The server runs on **http://localhost:3000**. You should see `Server is running on port 3000` in the terminal.

## Movie Data

Each movie has these fields:

| Field | Type | Description |
|---|---|---|
| id | number | Unique ID |
| title | string | Name of the movie |
| genre | string | Movie genre |
| year | number | Release year |
| watched | boolean | Whether the movie has been watched |

The server starts with 5 sample movies.

## Available Endpoints

| Method | Endpoint | Description | Success | Errors |
|---|---|---|---|---|
| GET | /api/movies | Get all movies | 200 | none |
| GET | /api/movies/:id | Get one movie by ID | 200 | 400, 404 |
| POST | /api/movies | Create a new movie | 201 | 400 |
| PUT | /api/movies/:id | Update an existing movie | 200 | 400, 404 |
| DELETE | /api/movies/:id | Delete a movie | 200 | 400, 404 |

### Example: Create a movie (POST)


{
  "title": "Need for Speed",
  "genre": "Action",
  "year": 2014,
  "watched": false
}


### Example: Update a movie (PUT)

Only send the fields you want to change:

{
  "watched": true
}


## Validation Rules

- **ID:** must be a whole number of 1 or higher.
- **title:** required on create, must be text and not empty.
- **genre:** required on create, must be text and not empty.
- **year:** required on create, must be a whole number between 1888 and the current year + 5.
- **watched:** required on create, must be `true` or `false` (not text).
- On **update**, only the fields that are sent are checked, and at least one field must be included.
- Extra fields in the request body are ignored, and the ID can never be changed.

## Error Handling

All errors return JSON with a message.

| Situation | Status | Example response |
|---|---|---|
| Invalid movie ID (e.g. `abc`) | 400 | `{ "message": "Invalid movie ID" }` |
| Movie does not exist | 404 | `{ "message": "Movie not found" }` |
| Missing or invalid data | 400 | `{ "message": "Title is required" }` |
| Update with no fields | 400 | `{ "message": "At least one movie field is required" }` |

When a request has more than one problem, the checks run in this order: valid ID (400), movie exists (404), valid data (400).

## How to Test the API

The API was tested using Postman. To test it yourself:

1. Start the server with `npm start` or `npm run dev`.
2. Open Postman and choose the method (GET, POST, PUT or DELETE).
3. Enter the URL, for example `http://localhost:3000/api/movies`.
4. For POST and PUT, open the **Body** tab, choose **raw**, set the type to **JSON** and enter the movie data.
5. Click **Send** and check the status code and response.

### Tests performed

1. Retrieve all movies
2. Retrieve one existing movie
3. Retrieve a movie that doesn't exist (404)
4. Create a new movie (201)
5. Retrieve the newly created movie
6. Update an existing movie
7. Retrieve the updated movie to confirm the changes
8. Delete a movie
9. Retrieve the deleted movie (404)
10. Update or delete a movie that doesn't exist (404)

Extra error tests: invalid ID (400), empty POST body (400), wrong data types (400).

Screenshots of every test are in the [`screenshots`](./screenshots) folder.

## Author

Chiwo Mvundura
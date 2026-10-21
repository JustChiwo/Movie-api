let movies = [
  {
    id: 1,
    title: "2 Fast 2 Furious",
    genre: "Action",
    year: 2003,
    watched: true,
  },
  {
    id: 2,
    title: "Avengers Infinity War",
    genre: "Action",
    year: 2018,
    watched: true,
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    genre: "Sci-Fi",
    year: 2021,
    watched: false,
  },
  {
    id: 4,
    title: "How to Train Your Dragon 3",
    genre: "Animation",
    year: 2019,
    watched: true,
  },
  {
    id: 5,
    title: "Minecraft The Movie",
    genre: "Animation",
    year: 2025,
    watched: false,
  },
];

const getAllMovies = (req, res) => {
  res.json(movies);
};

// Convert an ID and reject values that are not positive whole numbers.
const getValidMovieId = (id) => {
  const movieId = Number(id);

  if (!Number.isSafeInteger(movieId) || movieId < 1) {
    return null;
  }

  return movieId;
};

// Check required create fields or only the fields included in an update.
const validateMovieFields = (body, requireAllFields) => {
  const hasTitle = Object.prototype.hasOwnProperty.call(body, "title");
  const hasGenre = Object.prototype.hasOwnProperty.call(body, "genre");
  const hasYear = Object.prototype.hasOwnProperty.call(body, "year");
  const hasWatched = Object.prototype.hasOwnProperty.call(body, "watched");
  const currentYear = new Date().getFullYear();

  // Make sure the title is present and contains non-space text.
  if (requireAllFields || hasTitle) {
    if (requireAllFields && !hasTitle) {
      return "Title is required";
    }

    if (typeof body.title !== "string") {
      return "Title must be text";
    }

    if (body.title.trim() === "") {
      return "Title is required";
    }
  }

  // Make sure the genre is present and contains non-space text.
  if (requireAllFields || hasGenre) {
    if (requireAllFields && !hasGenre) {
      return "Genre is required";
    }

    if (typeof body.genre !== "string") {
      return "Genre must be text";
    }

    if (body.genre.trim() === "") {
      return "Genre is required";
    }
  }

  // Make sure the year is a number in the allowed range.
  if (requireAllFields || hasYear) {
    if (
      typeof body.year !== "number" ||
      !Number.isInteger(body.year) ||
      body.year < 1888 ||
      body.year > currentYear + 5
    ) {
      return `Year must be a whole number between 1888 and ${currentYear + 5}`;
    }
  }

  // Make sure watched is a real boolean.
  if ((requireAllFields || hasWatched) && typeof body.watched !== "boolean") {
    return "Watched must be true or false";
  }

  return null;
};

const getMovieById = (req, res) => {
  // Check that the requested ID is a positive whole number before looking it up.
  const movieId = getValidMovieId(req.params.id);
  if (movieId === null) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  const movie = movies.find((item) => item.id === movieId);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
};

const createMovie = (req, res) => {
  const body = req.body || {};

  // Check that all required movie fields have valid types and values.
  const validationError = validateMovieFields(body, true);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const movie = {
    title: body.title.trim(),
    genre: body.genre.trim(),
    year: body.year,
    watched: body.watched,
    id: movies.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
  };

  movies.push(movie);
  res.status(201).json(movie);
};

const updateMovie = (req, res) => {
  // Check the ID first so invalid IDs always return 400.
  const movieId = getValidMovieId(req.params.id);
  if (movieId === null) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  const movieIndex = movies.findIndex((item) => item.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const body = req.body || {};
  const hasTitle = Object.prototype.hasOwnProperty.call(body, "title");
  const hasGenre = Object.prototype.hasOwnProperty.call(body, "genre");
  const hasYear = Object.prototype.hasOwnProperty.call(body, "year");
  const hasWatched = Object.prototype.hasOwnProperty.call(body, "watched");

  // Require at least one editable field and validate only the fields provided.
  if (!hasTitle && !hasGenre && !hasYear && !hasWatched) {
    return res
      .status(400)
      .json({ message: "At least one movie field is required" });
  }

  const validationError = validateMovieFields(body, false);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const updatedMovie = { ...movies[movieIndex] };
  if (hasTitle) {
    updatedMovie.title = body.title.trim();
  }
  if (hasGenre) {
    updatedMovie.genre = body.genre.trim();
  }
  if (hasYear) {
    updatedMovie.year = body.year;
  }
  if (hasWatched) {
    updatedMovie.watched = body.watched;
  }
  movies[movieIndex] = updatedMovie;

  res.json(movies[movieIndex]);
};

const deleteMovie = (req, res) => {
  // Check that the requested ID is a positive whole number before looking it up.
  const movieId = getValidMovieId(req.params.id);
  if (movieId === null) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  const movieIndex = movies.findIndex((item) => item.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const [deletedMovie] = movies.splice(movieIndex, 1);
  res.json(deletedMovie);
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};

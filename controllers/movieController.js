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

const getMovieById = (req, res) => {
  const movie = movies.find((item) => item.id === Number(req.params.id));

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
};

const createMovie = (req, res) => {
  const movie = {
    ...req.body,
    id: movies.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
  };

  movies.push(movie);
  res.status(201).json(movie);
};

const updateMovie = (req, res) => {
  const movieIndex = movies.findIndex(
    (item) => item.id === Number(req.params.id),
  );

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies[movieIndex] = {
    ...movies[movieIndex],
    ...req.body,
    id: movies[movieIndex].id,
  };

  res.json(movies[movieIndex]);
};

const deleteMovie = (req, res) => {
  const movieIndex = movies.findIndex(
    (item) => item.id === Number(req.params.id),
  );

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

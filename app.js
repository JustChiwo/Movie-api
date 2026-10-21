const express = require("express");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const movieRoutes = require("./routes/movieroutes");

const app = express();
const port = 3000;

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

// Movie API routes
app.use("/api/movies", movieRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
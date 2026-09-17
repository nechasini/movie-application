const express = require("express");
const Movie = require("../models/movie");

const router = express.Router();

// GET all movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Add a movie
router.post("/", async (req, res) => {
    try {
        const movie = new Movie({
            title: req.body.title,
            year: req.body.year,
            genre: req.body.genre,
            rating: req.body.rating,
            image: req.body.image
        });

        const savedMovie = await movie.save();

        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a movie
router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json({
            message: "Movie deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
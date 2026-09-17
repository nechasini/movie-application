const API_URL = "/api/movies";


// Get all movies
async function getMovies() {

    try {

        const response = await fetch(API_URL);

        const movies = await response.json();

        displayMovies(movies);

    } catch (error) {

        console.error("Error fetching movies:", error);

    }
}


// Display movies
function displayMovies(movies) {

    const container =
        document.getElementById("movieContainer");

    container.innerHTML = "";

    if (movies.length === 0) {

        container.innerHTML =
            "<p>No movies available.</p>";

        return;
    }

    movies.forEach(movie => {

        const card =
            document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p><strong>Year:</strong> ${movie.year}</p>

                <p><strong>Genre:</strong> ${movie.genre}</p>

                <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>

                <button
                    class="delete-button"
                    onclick="deleteMovie('${movie._id}')">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// Add movie
document
    .getElementById("movieForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const movie = {

            title:
                document.getElementById("title").value,

            year:
                document.getElementById("year").value,

            genre:
                document.getElementById("genre").value,

            rating:
                document.getElementById("rating").value,

            image:
                document.getElementById("image").value
        };

        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(movie)
            });

            if (response.ok) {

                alert("Movie added successfully!");

                document
                    .getElementById("movieForm")
                    .reset();

                getMovies();

            } else {

                const error =
                    await response.json();

                alert(error.message);

            }

        } catch (error) {

            console.error("Error adding movie:", error);

        }
    });


// Delete movie
async function deleteMovie(id) {

    const confirmation =
        confirm("Are you sure you want to delete this movie?");

    if (!confirmation) {
        return;
    }

    try {

        const response =
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

        if (response.ok) {

            alert("Movie deleted successfully!");

            getMovies();

        }

    } catch (error) {

        console.error("Error deleting movie:", error);

    }
}


// Search movies
async function searchMovies() {

    const searchText =
        document.getElementById("searchInput").value
        .toLowerCase();

    const response =
        await fetch(API_URL);

    const movies =
        await response.json();

    const filteredMovies =
        movies.filter(movie =>
            movie.title.toLowerCase()
                .includes(searchText)
        );

    displayMovies(filteredMovies);
}


// Load movies when page opens
getMovies();
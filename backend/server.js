const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { getDb } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ──────────────── API Routes ────────────────

// GET /api/movies - Returns list of all movies
app.get("/api/movies", (req, res) => {
    try {
        const db = getDb();
        const movies = db.prepare("SELECT * FROM movies").all();
        res.json({
            success: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch movies"
        });
    }
});

// GET /api/movies/:id - Returns a single movie
app.get("/api/movies/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid movie ID"
            });
        }

        const db = getDb();
        const movie = db.prepare("SELECT * FROM movies WHERE id = ?").get(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                error: "Movie not found"
            });
        }

        res.json({ success: true, data: movie });
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch movie"
        });
    }
});

// POST /api/play/:movieId - Simulates starting playback
app.post("/api/play/:movieId", (req, res) => {
    try {
        const { movieId } = req.params;
        if (!movieId || isNaN(movieId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid movie ID"
            });
        }

        const db = getDb();

        // Reset all movies to idle first
        db.prepare("UPDATE movies SET status = 'idle' WHERE status = 'playing'").run();

        // Set the selected movie to playing
        const result = db.prepare("UPDATE movies SET status = 'playing' WHERE id = ?").run(movieId);

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: "Movie not found"
            });
        }

        const movie = db.prepare("SELECT * FROM movies WHERE id = ?").get(movieId);

        console.log(`🎬 Now playing: ${movie.name} (ID: ${movieId})`);

        res.json({
            success: true,
            message: `Now playing: ${movie.name}`,
            data: movie
        });
    } catch (error) {
        console.error("Error starting playback:", error);
        res.status(500).json({
            success: false,
            error: "Failed to start playback"
        });
    }
});

// POST /api/stop/:movieId - Simulates stopping playback
app.post("/api/stop/:movieId", (req, res) => {
    try {
        const { movieId } = req.params;
        if (!movieId || isNaN(movieId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid movie ID"
            });
        }

        const db = getDb();
        const result = db.prepare("UPDATE movies SET status = 'idle' WHERE id = ?").run(movieId);

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: "Movie not found"
            });
        }

        console.log(`⏹️ Stopped playback for movie ID: ${movieId}`);

        res.json({
            success: true,
            message: `Stopped playback for movie ID: ${movieId}`
        });
    } catch (error) {
        console.error("Error stopping playback:", error);
        res.status(500).json({
            success: false,
            error: "Failed to stop playback"
        });
    }
});

// GET /api/status - Returns currently playing movie
app.get("/api/status", (req, res) => {
    try {
        const db = getDb();
        const playing = db.prepare("SELECT * FROM movies WHERE status = 'playing'").get();
        res.json({
            success: true,
            currentlyPlaying: playing || null
        });
    } catch (error) {
        console.error("Error fetching status:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch status"
        });
    }
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ──────────────── Start Server ────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Netflix Clone API running on http://localhost:${PORT}`);
    console.log(`📡 Endpoints:`);
    console.log(`   GET  /api/movies        - List all movies`);
    console.log(`   GET  /api/movies/:id    - Get single movie`);
    console.log(`   POST /api/play/:movieId - Start playback`);
    console.log(`   POST /api/stop/:movieId - Stop playback`);
    console.log(`   GET  /api/status        - Currently playing`);
    console.log(`   GET  /api/health        - Health check\n`);
});

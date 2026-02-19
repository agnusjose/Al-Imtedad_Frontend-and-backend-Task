const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "netflix.db");

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initializeDb(db);
  }
  return db;
}

function initializeDb(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo TEXT NOT NULL,
      poster TEXT NOT NULL,
      backdrop TEXT NOT NULL,
      description TEXT,
      genre TEXT,
      year INTEGER,
      rating REAL,
      duration TEXT,
      status TEXT DEFAULT 'idle',
      streamUrl TEXT NOT NULL,
      previewUrl TEXT NOT NULL
    );
  `);

  // Seed data if table is empty
  const count = database.prepare("SELECT COUNT(*) as count FROM movies").get();
  if (count.count === 0) {
    seedMovies(database);
  }
}

function seedMovies(database) {
  const movies = [
    {
      name: "Big Buck Bunny",
      logo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
      description: "A large and lovable rabbit deals with three tiny bullies.",
      genre: "Animation, Comedy",
      year: 2008,
      rating: 4.5,
      duration: "9m 56s",
      status: "idle",
      streamUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      previewUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      name: "Sintel Trailer",
      logo: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1200&q=80",
      description: "A lonely young woman helps and befriends a dragon.",
      genre: "Animation, Fantasy",
      year: 2010,
      rating: 4.6,
      duration: "0m 52s",
      status: "idle",
      streamUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
      previewUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4"
    },
    {
      name: "Oceans",
      logo: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1200&q=80",
      description: "Journey into the depths of the ocean.",
      genre: "Documentary",
      year: 2014,
      rating: 4.8,
      duration: "0m 47s",
      status: "idle",
      streamUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      previewUrl: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
      name: "Agent 327",
      logo: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
      description: "Operation Barbershop.",
      genre: "Action, Animation",
      year: 2017,
      rating: 4.2,
      duration: "3m 52s",
      status: "idle",
      streamUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      previewUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      name: "Sprite Fight",
      logo: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80",
      description: "A group of mischievous wood sprites.",
      genre: "Comedy, Animation",
      year: 2021,
      rating: 4.4,
      duration: "10m 22s",
      status: "idle",
      streamUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      previewUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      name: "Echo Here We Are",
      logo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      description: "Music video for Echo - Here We Are.",
      genre: "Music",
      year: 2012,
      rating: 3.9,
      duration: "3m 15s",
      status: "idle",
      streamUrl: "https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/echo-hereweare.mp4",
      previewUrl: "https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/echo-hereweare.mp4"
    },
    {
      name: "Jellyfish",
      logo: "https://images.unsplash.com/photo-1544317316-f00998311ebc?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1544317316-f00998311ebc?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1544317316-f00998311ebc?auto=format&fit=crop&w=1200&q=80",
      description: "Beautiful jellyfish floating underwater.",
      genre: "Nature",
      year: 2020,
      rating: 4.5,
      duration: "0m 30s",
      status: "idle",
      streamUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      previewUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
    },
    {
      name: "Cosmos Laundromat",
      logo: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
      description: "Sheep Franck meets a mysterious salesman.",
      genre: "Sci-Fi, Animation",
      year: 2015,
      rating: 4.7,
      duration: "12m 10s",
      status: "idle",
      streamUrl: "https://www.w3schools.com/tags/movie.mp4",
      previewUrl: "https://www.w3schools.com/tags/movie.mp4"
    },
    {
      name: "Elephants Dream",
      logo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
      poster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
      backdrop: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
      description: "Friends journey inside a machine.",
      genre: "Animation, Sci-Fi",
      year: 2006,
      rating: 3.8,
      duration: "10m 54s",
      status: "idle",
      streamUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
      previewUrl: "https://media.w3.org/2010/05/video/movie_300.mp4"
    }
  ];

  const insert = database.prepare(`
    INSERT INTO movies (name, logo, poster, backdrop, description, genre, year, rating, duration, status, streamUrl, previewUrl)
    VALUES (@name, @logo, @poster, @backdrop, @description, @genre, @year, @rating, @duration, @status, @streamUrl, @previewUrl)
  `);

  const insertMany = database.transaction((movieList) => {
    for (const movie of movieList) {
      insert.run(movie);
    }
  });

  insertMany(movies);
  console.log("✅ Seeded 9 UNIQUE stable movies into SQLite database");
}

module.exports = { getDb };

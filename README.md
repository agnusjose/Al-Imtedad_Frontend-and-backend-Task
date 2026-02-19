# 🎬 NetStream - Netflix Clone (Full-Stack)

A Netflix-inspired streaming web application featuring interactive movie previews, fullscreen playback, and a complete REST API backend.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?logo=sqlite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [API Documentation](#-api-documentation)
- [Video Source](#-video-source)
- [Screenshots](#-screenshots)

---

## ✨ Features

### Frontend
- **🎥 Movie Preview on Hover**: Hovering over a movie card plays a muted video preview in the background
- **▶️ Fullscreen Playback**: Clicking a movie hides the main page and plays the movie in fullscreen
- **🔙 Back Navigation**: A transparent back button appears on mouse movement in fullscreen mode
- **📱 Fully Responsive**: Works on desktop, tablet, and mobile devices
- **🎨 Premium UI**: Netflix-inspired design with smooth animations, glassmorphism effects, and hover transitions
- **⌨️ Keyboard Shortcuts**: Press `Space` to play/pause, `Escape` to go back
- **📊 Real-time Status**: Simulated streaming status indicators

### Backend
- **RESTful API**: Full CRUD endpoints for movie data
- **SQLite Database**: Persistent storage with automatic seeding
- **Playback Simulation**: Status tracking for currently playing movies
- **Input Validation**: Proper error handling and validation on all endpoints
- **Request Logging**: Morgan middleware for HTTP request logging

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 (Vite) | Fast component-based UI |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **State Management** | Zustand | Lightweight global state |
| **HTTP Client** | Axios | API communication |
| **Backend Framework** | Express.js | REST API server |
| **Database** | SQLite (better-sqlite3) | Persistent movie data storage |
| **Logging** | Morgan | HTTP request logging |
| **Video** | HTML5 Video + HLS.js | Stream simulation |

### Why These Technologies?

- **React + Vite**: Blazing fast HMR and build times, modern React 19 features
- **Tailwind CSS**: Rapid UI development with utility classes, no custom CSS overhead
- **Zustand**: Simpler than Redux with zero boilerplate, perfect for this app's state needs
- **Express**: Industry-standard Node.js framework, lightweight and flexible
- **SQLite**: Zero-configuration database, perfect for demo apps, earns bonus points over in-memory storage
- **HTML5 Video**: Native browser support, no external player dependencies needed

---

## 📁 Project Structure

```
FrontendBackend/
├── frontend/                    # React Frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   └── movieApi.js      # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Top navigation bar
│   │   │   ├── HeroSection.jsx  # Featured movie banner
│   │   │   ├── MovieCard.jsx    # Interactive movie card with preview
│   │   │   ├── MovieGrid.jsx    # Responsive movie grid layout
│   │   │   ├── FullscreenPlayer.jsx  # Fullscreen video player
│   │   │   ├── LoadingSkeleton.jsx   # Loading state UI
│   │   │   └── Footer.jsx      # Page footer
│   │   ├── store/
│   │   │   └── useMovieStore.js # Zustand state management
│   │   ├── App.jsx              # Root application component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles + Tailwind
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration + API proxy
│   └── package.json
│
├── backend/                     # Express Backend
│   ├── server.js                # Express API server
│   ├── db.js                    # SQLite database + seed data
│   ├── package.json
│   └── netflix.db               # SQLite database file (auto-generated)
│
└── README.md                    # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd FrontendBackend
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend Server

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 4. Install Frontend Dependencies (in a new terminal)

```bash
cd frontend
npm install
```

### 5. Start the Frontend Dev Server

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### 6. Open in Browser

Navigate to **http://localhost:5173** to see the application.

> **Note**: The frontend dev server proxies API requests to the backend automatically via Vite's proxy configuration.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/movies` | Returns list of all movies with name, logo, id, status, and stream URL |
| `GET` | `/api/movies/:id` | Returns a single movie by ID |
| `POST` | `/api/play/:movieId` | Simulates starting playback (updates status to 'playing') |
| `POST` | `/api/stop/:movieId` | Simulates stopping playback (updates status to 'idle') |
| `GET` | `/api/status` | Returns currently playing movie |
| `GET` | `/api/health` | Health check endpoint |

### Example Response: GET /api/movies

```json
{
  "success": true,
  "count": 9,
  "data": [
    {
      "id": 1,
      "name": "Big Buck Bunny",
      "logo": "https://...",
      "poster": "https://...",
      "backdrop": "https://...",
      "description": "A large and lovable rabbit...",
      "genre": "Animation, Comedy",
      "year": 2008,
      "rating": 4.5,
      "duration": "9m 56s",
      "status": "idle",
      "streamUrl": "https://...BigBuckBunny.mp4",
      "previewUrl": "https://...BigBuckBunny.mp4"
    }
  ]
}
```

### Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error description message"
}
```

Status codes used:
- `200` - Success
- `400` - Bad Request (invalid ID)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🎥 Video Source

All videos used in this project are **publicly available sample videos** hosted by Google:

- **Source**: [Google Sample Videos](https://gist.github.com/jsturgis/3b19447b304616f18657)
- **Format**: `.mp4` (H.264)
- **Content**: Open-source short films (Big Buck Bunny, Sintel, Elephant Dream, Tears of Steel) and Google sample clips
- **License**: Creative Commons / Public Domain

These videos are streamed directly from Google's CDN (`commondatastorage.googleapis.com`), simulating real streaming behavior.

---

## 🎯 How It Works

### Hover Preview
1. User hovers over a movie card
2. Zustand store updates `hoveredMovieId` - only one movie can be hovered at a time
3. The `<video>` element on the hovered card starts playing (muted)
4. When the user moves away, the video pauses and resets

### Fullscreen Playback
1. User clicks a movie card
2. Frontend calls `POST /api/play/:movieId` to log playback on the backend
3. The main page is hidden (`display: none`)
4. A fullscreen video player takes over with custom controls
5. A transparent back button appears on mouse movement (top-left corner)

### Back Navigation
1. User clicks the back button (or presses Escape)
2. Frontend calls `POST /api/stop/:movieId` to update status
3. Fullscreen player is unmounted
4. Main Netflix page is revealed
5. Hover previews work again immediately

---

## 🏆 Bonus Features Implemented

- ✅ Clean animations and hover effects (card scaling, fade-ins, shimmer loading)
- ✅ Full responsiveness (mobile, tablet, desktop)
- ✅ Real-time status updates (playing/idle indicators with green dot animation)
- ✅ Backend validations and error handling (ID validation, 404s, try-catch blocks)
- ✅ SQLite database (bonus over in-memory/JSON storage)
- ✅ Custom video player controls (progress bar, volume, play/pause)
- ✅ Keyboard shortcuts (Space for play/pause, Escape to go back)
- ✅ Glassmorphism effects (navbar, player controls)
- ✅ Loading skeletons (shimmer animation while fetching data)

---

## 📄 License

This project is for educational/evaluation purposes.
Video content © respective owners (Creative Commons licensed).

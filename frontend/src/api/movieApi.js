import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// GET /movies - fetch all movies
export const fetchMovies = async () => {
    const response = await api.get('/movies');
    return response.data;
};

// GET /movies/:id - fetch single movie
export const fetchMovie = async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
};

// POST /play/:movieId - start playback
export const startPlayback = async (movieId) => {
    const response = await api.post(`/play/${movieId}`);
    return response.data;
};

// POST /stop/:movieId - stop playback
export const stopPlayback = async (movieId) => {
    const response = await api.post(`/stop/${movieId}`);
    return response.data;
};

// GET /status - get currently playing
export const getStatus = async () => {
    const response = await api.get('/status');
    return response.data;
};

export default api;
